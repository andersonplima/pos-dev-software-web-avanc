package com.anderson.jhipsterapp1.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ItemPedidoMapperTest {

    private ItemPedidoMapper itemPedidoMapper;

    @BeforeEach
    public void setUp() {
        itemPedidoMapper = new ItemPedidoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(itemPedidoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(itemPedidoMapper.fromId(null)).isNull();
    }
}
