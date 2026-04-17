package com.anderson.jhipsterapp1.service.mapper;

import static com.anderson.jhipsterapp1.domain.ClienteAsserts.*;
import static com.anderson.jhipsterapp1.domain.ClienteTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ClienteMapperTest {

    private ClienteMapper clienteMapper;

    @BeforeEach
    void setUp() {
        clienteMapper = new ClienteMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getClienteSample1();
        var actual = clienteMapper.toEntity(clienteMapper.toDto(expected));
        assertClienteAllPropertiesEquals(expected, actual);
    }
}
