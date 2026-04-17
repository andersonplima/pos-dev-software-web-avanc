package com.anderson.jhipsterapp1.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TipoFestaTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2L * Integer.MAX_VALUE));

    public static TipoFesta getTipoFestaSample1() {
        return new TipoFesta().id(1L).nome("nome1").descricao("descricao1");
    }

    public static TipoFesta getTipoFestaSample2() {
        return new TipoFesta().id(2L).nome("nome2").descricao("descricao2");
    }

    public static TipoFesta getTipoFestaRandomSampleGenerator() {
        return new TipoFesta().id(longCount.incrementAndGet()).nome(UUID.randomUUID().toString()).descricao(UUID.randomUUID().toString());
    }
}
