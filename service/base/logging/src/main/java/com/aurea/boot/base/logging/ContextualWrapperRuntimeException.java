package com.aurea.boot.base.logging;

/**
 * Unchecked exception wrapper that allows including the context.
 */
public class ContextualWrapperRuntimeException extends RuntimeException implements ContextualMessageCarrier {

    private final transient ContextualLogCapable ctx;

    public ContextualWrapperRuntimeException(Throwable cause, ContextualLogCapable ctx) {
        super(cause);
        this.ctx = ctx;
    }

    public static Throwable wrapIfNotAlready(Throwable throwable, ContextualLogCapable ctx) {
        if (throwable instanceof ContextualWrapperRuntimeException) {
            return throwable;
        } else {
            return new ContextualWrapperRuntimeException(throwable, ctx);
        }
    }

    @Override
    public ContextualLogCapable getContextualMessage() {
        return ctx;
    }
}
