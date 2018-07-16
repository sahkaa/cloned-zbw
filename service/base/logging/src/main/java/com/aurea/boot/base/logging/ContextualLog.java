package com.aurea.boot.base.logging;

import java.io.Closeable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;

/*
 * Configures contextual logging with try-with-close support.
 *
 * Usage:
 * <code>
 *     try (ContextualLog __ = new ContextualLog(someObject)) {
 *
 *     }
 * </code>
 *
 * All logs in the try block will have contextual logs based on someObject ( referred to as the context )
 */
@Slf4j
public final class ContextualLog implements Closeable {

    static final String DEFAULT_ERROR_VALUE = "ERROR-UNKNOWN";
    private final Map<String, String> previousMdCContext;
    private final ContextualLogCapable ctx;
    private final Set<String> mappedKeys = new HashSet<>();

    public ContextualLog(ContextualLogCapable ctx) {
        if (ctx == null) {
            throw new IllegalArgumentException("Can not configure contextual log from null context");
        }
        previousMdCContext = MDC.getCopyOfContextMap();
        this.ctx = ctx;
        configureContext(this.ctx);
    }

    private static Set<String> mapBasedOnAnnotation(
            ContextualLogCapable ctx, Class<?> clazz, Set<String> excludes
    ) {
        Set<String> allKeys = new HashSet<>();
        for (Method method : clazz.getDeclaredMethods()) {
            LogContext annotation = method.getAnnotation(LogContext.class);
            if (annotation == null) {
                continue;
            }
            String key = annotation.value();
            if (excludes.contains(key)) {
                continue;
            }
            String value = attemptCallAnnotatedMethod(ctx, method);
            if (value != null) {
                if (didAlreadyProcessKey(ctx, key, allKeys)) {
                    continue;
                }
                mapIntoMdcIfNotNull(key, value);
            }
        }

        return allKeys;
    }

    private static String attemptCallAnnotatedMethod(ContextualLogCapable ctx, Method method) {
        String value = DEFAULT_ERROR_VALUE;
        if (method.getParameterTypes().length == 0) {
            try {
                Object obj = method.invoke(ctx);
                value = Objects.toString(obj, null);
            } catch (IllegalAccessException | InvocationTargetException e) {
                log.warn("Can't set context based on {}.{}",
                        ctx.getClass().getName(), method.getName(), e
                );
            }
        }
        return value;
    }

    private static boolean didAlreadyProcessKey(ContextualLogCapable ctx, String key,
            Set<String> allKeys) {
        if (allKeys.contains(key)) {
            log.warn("{} has more than one annotation {} with key: {}",
                    ctx.getClass().getName(), LogContext.class.getName(), key
            );
            return true;
        } else {
            allKeys.add(key);
        }
        return false;
    }

    private static void mapIntoMdcIfNotNull(String key, String value) {
        if (value != null) {
            MDC.put(key, value);
        }
    }

    private void configureContext(ContextualLogCapable ctx) {
        cleanMdcKeysFromContext();

        mapFromContextIntoMdc(ctx);
    }

    private void mapFromContextIntoMdc(ContextualLogCapable ctx) {
        // keep track of what we map so super doesn't overwrite current.

        // walk the class hierarchy
        for (Class<?> clazz = ctx.getClass(); clazz != null; clazz = clazz.getSuperclass()) {
            mappedKeys.addAll(
                    mapBasedOnAnnotation(ctx, clazz, mappedKeys)
            );
            // and check the interfaces directly
            for (Class<?> anInterface : clazz.getInterfaces()) {
                mappedKeys.addAll(
                        mapBasedOnAnnotation(ctx, anInterface, mappedKeys)
                );
                // but don't walk the interface hierarchy
            }
        }
    }

    private void cleanMdcKeysFromContext() {
        // MDC is thread safe by nature
        for (String key : mappedKeys) {
            MDC.remove(key);
        }
    }

    @Override
    public void close() throws RuntimeException {
        // look for LogContextClose only in the current ContextualLogCapable
        for (Method method : ctx.getClass().getDeclaredMethods()) {
            LogContextClose closeAnnotation = method.getAnnotation(LogContextClose.class);
            if (closeAnnotation != null) {
                attemptCallAnnotatedMethod(ctx, method);
            }
        }
        if (previousMdCContext != null) {
            MDC.setContextMap(previousMdCContext);
        } else {
            cleanMdcKeysFromContext();
        }
    }
}
