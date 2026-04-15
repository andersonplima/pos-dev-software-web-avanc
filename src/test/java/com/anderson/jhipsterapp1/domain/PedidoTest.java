package com.anderson.jhipsterapp1.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.anderson.jhipsterapp1.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class PedidoTest {

  @Test
  public void equalsVerifier() throws Exception {
    TestUtil.equalsVerifier(Pedido.class);
    Pedido pedido1 = new Pedido();
    pedido1.setId(1L);
    Pedido pedido2 = new Pedido();
    pedido2.setId(pedido1.getId());
    assertThat(pedido1).isEqualTo(pedido2);
    pedido2.setId(2L);
    assertThat(pedido1).isNotEqualTo(pedido2);
    pedido1.setId(null);
    assertThat(pedido1).isNotEqualTo(pedido2);
  }
}
