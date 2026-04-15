package com.anderson.jhipsterapp1.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TipoFestaMapperTest {

    private TipoFestaMapper tipoFestaMapper;

    @BeforeEach
    public void setUp() {
        tipoFestaMapper = new TipoFestaMapperImpl();
    }
}
