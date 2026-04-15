package com.anderson.jhipsterapp1.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FestaTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Festa getFestaSample1() {
        return new Festa().id(1L).nome("nome1").tema("tema1");
    }

    public static Festa getFestaSample2() {
        return new Festa().id(2L).nome("nome2").tema("tema2");
    }

    public static Festa getFestaRandomSampleGenerator() {
        return new Festa().id(longCount.incrementAndGet()).nome(UUID.randomUUID().toString()).tema(UUID.randomUUID().toString());
    }
}
