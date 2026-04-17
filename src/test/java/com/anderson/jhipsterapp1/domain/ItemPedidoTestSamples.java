package com.anderson.jhipsterapp1.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ItemPedidoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2L * Integer.MAX_VALUE));

    public static ItemPedido getItemPedidoSample1() {
        return new ItemPedido().id(1L).nomeItem("nomeItem1");
    }

    public static ItemPedido getItemPedidoSample2() {
        return new ItemPedido().id(2L).nomeItem("nomeItem2");
    }

    public static ItemPedido getItemPedidoRandomSampleGenerator() {
        return new ItemPedido().id(longCount.incrementAndGet()).nomeItem(UUID.randomUUID().toString());
    }
}
