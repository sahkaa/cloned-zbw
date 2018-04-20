package com.aurea.boot.base.logging;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.slf4j.Logger;

@SuppressWarnings("PMD.LoggerIsNotStaticFinal")
public class TopLevelExceptionHandlerTest {

    private final Logger log = mock(Logger.class);

    @Test
    public void givenExamplesShouldLog() throws Exception {
        TopLevelExceptionHandler.logAndEat(log, null);
        Exception anyException = new Exception("test");
        TopLevelExceptionHandler.logAndEat(log, anyException);
        TopLevelExceptionHandler.logAndEat(log, mock(ContextualLogCapable.class), anyException);
        TopLevelExceptionHandler.logAndEat(log, new ContextualWrapperRuntimeException(null, null));
        TopLevelExceptionHandler.logAndEat(log, new ContextualWrapperRuntimeException(anyException, null));
        TopLevelExceptionHandler.logAndEat(log, new ContextualWrapperRuntimeException(anyException,
                mock(ContextualLogCapable.class)));
        Exception lockWaitException = new Exception(TopLevelExceptionHandler.LOCK_WAIT_TIMEOUT);
        TopLevelExceptionHandler.logAndEat(log, lockWaitException);

        verify(log, times(2)).error(anyString(), any(ContextualLogCapable.class),
                any(Throwable.class));
        verify(log, times(4)).error(anyString(), any(Throwable.class));
    }
}
