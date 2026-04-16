package com.anderson.jhipsterapp1.service.mapper;

import static com.anderson.jhipsterapp1.domain.ItemPedidoAsserts.*;
import static com.anderson.jhipsterapp1.domain.ItemPedidoTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ItemPedidoMapperTest {

    private ItemPedidoMapper itemPedidoMapper;

    @BeforeEach
    void setUp() {
        itemPedidoMapper = new ItemPedidoMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getItemPedidoSample1();
        var actual = itemPedidoMapper.toEntity(itemPedidoMapper.toDto(expected));
        assertItemPedidoAllPropertiesEquals(expected, actual);
    }
}
