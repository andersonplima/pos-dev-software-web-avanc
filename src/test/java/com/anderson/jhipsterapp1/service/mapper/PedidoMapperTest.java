package com.anderson.jhipsterapp1.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PedidoMapperTest {

  private PedidoMapper pedidoMapper;

  @BeforeEach
  public void setUp() {
    pedidoMapper = new PedidoMapperImpl();
  }

  @Test
  public void testEntityFromId() {
    Long id = 1L;
    assertThat(pedidoMapper.fromId(id).getId()).isEqualTo(id);
    assertThat(pedidoMapper.fromId(null)).isNull();
  }
}
