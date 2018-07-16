package com.aurea.boot.base.logging;

import com.google.common.annotations.VisibleForTesting;
import java.util.Map;
import org.slf4j.Logger;

/*
 * Exception Handler to be used in servers, or other multi threaded apps that need to deal with a failure but continue
 * serviceing other request.
 *
 * Goal is to assure that the Exception is not ignored, and offers a dRY way of dealing with this across the board.
 * The implementation does a best-effort to extract the most possible context from the exception if any, but will also
 * works if no context or null context is found. It doesn't have a logger of it's own so messages seem to have been
 * logged from the caller, to better reflect teh source of the error.
 */
@SuppressWarnings({"PMD.LoggerIsNotStaticFinal", "PMD.DoNotUseThreads"})
public final class TopLevelExceptionHandler {

    @VisibleForTesting
    static final String LOCK_WAIT_TIMEOUT = "Lock wait timeout";

    private final Logger logger;

    private final String messagePrefix;

    private TopLevelExceptionHandler(Logger logger) {
        this.logger = logger;
        messagePrefix = "Unhandled exception";
    }

    private TopLevelExceptionHandler(Logger logger, String messagePrefix) {
        this.logger = logger;
        this.messagePrefix = messagePrefix;
    }

    public static void logAndEat(Logger logger, Throwable throwable) {
        new TopLevelExceptionHandler(logger).handleError(throwable);
    }

    public static void logAndEat(Logger logger, String msgPrefix, Throwable throwable) {
        new TopLevelExceptionHandler(logger, msgPrefix).handleError(throwable);
    }

    public static void logAndEat(Logger logger, ContextualLogCapable contextualLogCapable, Throwable throwable) {
        new TopLevelExceptionHandler(logger).handleError(throwable, contextualLogCapable);
    }

    private ContextualLogCapable extractMessage(Throwable throwable) {
        ContextualLogCapable contextualMessage = null;
        if (throwable instanceof ContextualMessageCarrier) {
            contextualMessage = ((ContextualMessageCarrier) throwable).getContextualMessage();
        }
        return contextualMessage;
    }

    private void handleError(Throwable throwable, ContextualLogCapable contextualLogCapable) {
        if (contextualLogCapable != null) {
            try (ContextualLog ignored = new ContextualLog(contextualLogCapable)) {
                logger.error(messagePrefix + " while processing {}" + getThreadsForLockWaitExceptions(throwable),
                        contextualLogCapable, throwable
                );
            }
        } else {
            logger.error(messagePrefix + getThreadsForLockWaitExceptions(throwable), throwable);
        }
    }

    private void handleError(Throwable throwable) {
        ContextualLogCapable contextualMessage = extractMessage(throwable);
        handleError(throwable, contextualMessage);
    }

    /*
     * If the error being logged is a database lock timeout exception, retrive the thread dump
     */
    private String getThreadsForLockWaitExceptions(Throwable throwable) {
        StringBuilder threadDumpMessage = new StringBuilder();
        try {
            Throwable lockWaitException = throwable;
            //Walk thru the cause hierarchy to find a lock wait exception
            while (lockWaitException != null && !(lockWaitException.getMessage() != null
                    && lockWaitException.getMessage().contains(LOCK_WAIT_TIMEOUT))) {
                lockWaitException = lockWaitException.getCause();
            }
            if (lockWaitException != null) {
                threadDumpMessage.append("\nStacktrace of threads in JVM when this happened: \n");
                Map<Thread, StackTraceElement[]> threadsMap = Thread.getAllStackTraces();
                for (Map.Entry<Thread, StackTraceElement[]> thread : threadsMap.entrySet()) {
                    threadDumpMessage.append("\nThread id: ").append(thread.getKey().getId()).append('\n');
                    for (StackTraceElement elem : thread.getValue()) {
                        threadDumpMessage.append(elem.toString()).append('\n');
                    }
                }
            }
        } catch (SecurityException ex) {
            logger.warn("Security restriction prevents obtaining a thread stack dump", ex);
        }
        return threadDumpMessage.toString();
    }
}
