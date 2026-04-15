package com.anderson.jhipsterapp1.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TipoFestaMapperTest {

    private TipoFestaMapper tipoFestaMapper;

    @BeforeEach
    public void setUp() {
        tipoFestaMapper = new TipoFestaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(tipoFestaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(tipoFestaMapper.fromId(null)).isNull();
    }
}
