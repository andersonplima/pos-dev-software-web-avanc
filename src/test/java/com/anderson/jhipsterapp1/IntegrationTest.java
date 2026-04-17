package com.anderson.jhipsterapp1;

import com.anderson.jhipsterapp1.config.AsyncSyncConfiguration;
import com.anderson.jhipsterapp1.config.EmbeddedSQL;
import com.anderson.jhipsterapp1.config.JacksonConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { Jhipsterapp1App.class, JacksonConfiguration.class, AsyncSyncConfiguration.class })
@EmbeddedSQL
public @interface IntegrationTest {
}
