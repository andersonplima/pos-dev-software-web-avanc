package com.anderson.jhipsterapp1.config;

import org.testcontainers.containers.JdbcDatabaseContainer;

public interface SqlTestContainer {
    JdbcDatabaseContainer<?> getTestContainer();
}
