package com.anderson.jhipsterapp1.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ClienteMapperTest {

  private ClienteMapper clienteMapper;

  @BeforeEach
  public void setUp() {
    clienteMapper = new ClienteMapperImpl();
  }

  @Test
  public void testEntityFromId() {
    Long id = 1L;
    assertThat(clienteMapper.fromId(id).getId()).isEqualTo(id);
    assertThat(clienteMapper.fromId(null)).isNull();
  }
}
