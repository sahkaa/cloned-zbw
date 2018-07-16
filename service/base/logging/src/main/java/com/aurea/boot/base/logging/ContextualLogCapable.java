package com.aurea.boot.base.logging;

/*
 * Marker interface for objects that expose an specific context to be carried forward in logging.
 *
 * The actual information is provided by annotated public methods.
 * The annotations are only supported on public methods ( and not on fields ) to respect and keep encapsulation.
 *
 * The same information might be attached to log messages trough the logging configuration from environmental variables
 * or system properties, but only if not provided by the instance.
 */
public interface ContextualLogCapable {}
