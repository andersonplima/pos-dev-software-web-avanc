package com.anderson.jhipsterapp1.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class FestaMapperTest {

    private FestaMapper festaMapper;

    @BeforeEach
    public void setUp() {
        festaMapper = new FestaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(festaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(festaMapper.fromId(null)).isNull();
    }
}
