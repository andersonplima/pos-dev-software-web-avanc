package com.anderson.jhipsterapp1.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FestaMapperTest {

    private FestaMapper festaMapper;

    @BeforeEach
    public void setUp() {
        festaMapper = new FestaMapperImpl();
    }
}
