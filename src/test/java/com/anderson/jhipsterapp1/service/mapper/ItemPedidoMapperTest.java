package com.anderson.jhipsterapp1.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ItemPedidoMapperTest {

    private ItemPedidoMapper itemPedidoMapper;

    @BeforeEach
    public void setUp() {
        itemPedidoMapper = new ItemPedidoMapperImpl();
    }
}
