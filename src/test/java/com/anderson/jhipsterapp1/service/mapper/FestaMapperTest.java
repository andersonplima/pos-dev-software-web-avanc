package com.anderson.jhipsterapp1.service.mapper;

import static com.anderson.jhipsterapp1.domain.FestaAsserts.*;
import static com.anderson.jhipsterapp1.domain.FestaTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FestaMapperTest {

    private FestaMapper festaMapper;

    @BeforeEach
    void setUp() {
        festaMapper = new FestaMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getFestaSample1();
        var actual = festaMapper.toEntity(festaMapper.toDto(expected));
        assertFestaAllPropertiesEquals(expected, actual);
    }
}
