package com.aurea.boot.base.logging;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Map;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.MDC;

@SuppressWarnings("PMD.AccessorMethodGeneration")
public class ContextualLogTest {

    private static final String FOO = "foo";
    private static final String BAR = "bar";

    @Mock
    private ComplexContextContextualLogProvider messageFoo;

    @Mock
    private ComplexContextContextualLogProvider messageBar;

    @Before
    public void setup() {
        MDC.clear();
        MockitoAnnotations.initMocks(this);
        when(messageFoo.getDummyValueString()).thenReturn(FOO);
        when(messageBar.getDummyValueString()).thenReturn(BAR);
    }

    @Test
    public void syntax() {
        assertNoContext();
        try (ContextualLog ignored = new ContextualLog(messageFoo)) {
            assertFooInContext();
        }
        assertNoContext();
    }

    @Test
    public void doubleContext() {
        assertNoContext();
        try (ContextualLog ignored = new ContextualLog(messageFoo)) {
            assertFooInContext();
            try (ContextualLog ignored2 = new ContextualLog(messageBar)) {
                assertBarInContext();
            }
            assertFooInContext();
        }
        assertNoContext();
    }

    @Test
    public void givenConfigureContextNopShouldWork() {
        try (ContextualLog ignored = new ContextualLog(new NullableContextContextualLogProvider())) {
            assertNoContext();
        }
        assertNoContext();
    }

    @Test
    public void multipleAnnotationsPerClassSingleValidValue() {
        assertNoContext();
        ComplexContextContextualLogProvider ctx = new ComplexContextContextualLogProvider();
        try (ContextualLog __ = new ContextualLog(ctx)) {
            assertEquals(ctx.getDummyValueString(), MDC.get(ComplexContextContextualLogProvider.DUMMY_LOG_CONTEXT_ONE));
            assertEquals(String.valueOf(ctx.getDummyValueInt()),
                    MDC.get(ComplexContextContextualLogProvider.DUMMY_LOG_CONTEXT_TWO));
        }
    }

    @Test
    public void multipleAnnotationsPerClassMultipleValidValues() {
        assertNoContext();
        try (ContextualLog __ = new ContextualLog(new InheritedContextContextualLogProvider())) {
            String value = MDC.get(ComplexContextContextualLogProvider.DUMMY_LOG_CONTEXT_ONE);
            // precedence undefined, but one will get set
            assertTrue(FOO.equals(value) || BAR.equals(value));
        }
    }

    @Test
    public void multipleAnnotationsWithConflics() {
        assertNoContext();
        try (ContextualLog __ = new ContextualLog(new ConflictedContextContextualLogProvider())) {
            String value = MDC.get(ConflictedContextContextualLogProvider.DUMMY_LOG_CONTEXT_ONE);
            // precedence undefined, but one will get set
            assertTrue(FOO.equals(value) || BAR.equals(value));
        }
    }

    @Test
    public void raisesException() {
        assertNoContext();
        try (ContextualLog __ = new ContextualLog(new InheritedContextContextualLogProvider())) {
            assertEquals(ContextualLog.DEFAULT_ERROR_VALUE,
                    MDC.get(InheritedContextContextualLogProvider.RAISE_EXCEPTION_CONTEXT));
        }
    }

    private void assertFooInContext() {
        assertEquals(FOO, MDC.get(ComplexContextContextualLogProvider.DUMMY_LOG_CONTEXT_ONE));
    }

    private void assertBarInContext() {
        assertEquals(BAR, MDC.get(ComplexContextContextualLogProvider.DUMMY_LOG_CONTEXT_ONE));
    }

    private void assertNoContext() {
        Map<String, String> copyOfContextMap = MDC.getCopyOfContextMap();
        assertTrue(copyOfContextMap == null || copyOfContextMap.isEmpty());
    }

    private static class ComplexContextContextualLogProvider implements ContextualLogCapable {

        static final String DUMMY_LOG_CONTEXT_ONE = "dummyLogContextOne";
        static final String DUMMY_LOG_CONTEXT_TWO = "dummyLogContextTwo";

        @LogContext(DUMMY_LOG_CONTEXT_ONE)
        public String getDummyValueString() {
            return FOO;
        }

        @LogContext(DUMMY_LOG_CONTEXT_TWO)
        public int getDummyValueInt() {
            return 1;
        }
    }

    private static class ConflictedContextContextualLogProvider implements ContextualLogCapable {

        static final String DUMMY_LOG_CONTEXT_ONE = "dummyLogContextOne";

        @LogContext(DUMMY_LOG_CONTEXT_ONE)
        public String getDummyValueStringFoo() {
            return FOO;
        }

        @LogContext(DUMMY_LOG_CONTEXT_ONE)
        public String getDummyValueStringBar() {
            return BAR;
        }
    }

    private static class InheritedContextContextualLogProvider extends ComplexContextContextualLogProvider {

        static final String CHILD_LOG_CONTEXT_TWO = "child_log_context_two";
        static final String RAISE_EXCEPTION_CONTEXT = "raise_exception_context";

        @LogContext(DUMMY_LOG_CONTEXT_ONE)
        public String getDummyValueString() {
            return BAR;
        }

        @LogContext(CHILD_LOG_CONTEXT_TWO)
        public int getDummyValueInt() {
            return 1;
        }

        @LogContext(RAISE_EXCEPTION_CONTEXT)
        public int raiseException() {
            throw new IllegalArgumentException("runtime exception to test");
        }
    }

    private static class NullableContextContextualLogProvider implements ContextualLogCapable {
    }
}
