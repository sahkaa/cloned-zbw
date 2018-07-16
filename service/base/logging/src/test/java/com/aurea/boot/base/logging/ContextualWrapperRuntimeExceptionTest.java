package com.aurea.boot.base.logging;

import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsInstanceOf.instanceOf;
import static org.junit.Assert.assertThat;

import org.junit.Test;

@SuppressWarnings("PMD.AccessorMethodGeneration")
public class ContextualWrapperRuntimeExceptionTest {

    @Test
    public void wrapIfNotAlreadyWorks() throws Exception {
        DummyContextualLogProvider ctx = new DummyContextualLogProvider();
        ContextualWrapperRuntimeException cwre = new ContextualWrapperRuntimeException(new RuntimeException(), ctx);
        assertThat(ContextualWrapperRuntimeException.wrapIfNotAlready(cwre, ctx), is(cwre));
        assertThat(ContextualWrapperRuntimeException.wrapIfNotAlready(new RuntimeException(), ctx),
                instanceOf(ContextualWrapperRuntimeException.class));
    }

    private static class DummyContextualLogProvider implements ContextualLogCapable {
    }
}
