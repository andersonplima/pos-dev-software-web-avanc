package com.anderson.jhipsterapp1.service.mapper;

import static com.anderson.jhipsterapp1.domain.PedidoAsserts.*;
import static com.anderson.jhipsterapp1.domain.PedidoTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PedidoMapperTest {

    private PedidoMapper pedidoMapper;

    @BeforeEach
    void setUp() {
        pedidoMapper = new PedidoMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getPedidoSample1();
        var actual = pedidoMapper.toEntity(pedidoMapper.toDto(expected));
        assertPedidoAllPropertiesEquals(expected, actual);
    }
}
