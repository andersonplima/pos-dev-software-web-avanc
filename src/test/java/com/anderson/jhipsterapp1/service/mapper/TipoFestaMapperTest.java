package com.anderson.jhipsterapp1.service.mapper;

import static com.anderson.jhipsterapp1.domain.TipoFestaAsserts.*;
import static com.anderson.jhipsterapp1.domain.TipoFestaTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TipoFestaMapperTest {

    private TipoFestaMapper tipoFestaMapper;

    @BeforeEach
    void setUp() {
        tipoFestaMapper = new TipoFestaMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTipoFestaSample1();
        var actual = tipoFestaMapper.toEntity(tipoFestaMapper.toDto(expected));
        assertTipoFestaAllPropertiesEquals(expected, actual);
    }
}
