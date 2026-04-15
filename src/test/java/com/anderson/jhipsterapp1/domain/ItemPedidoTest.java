package com.anderson.jhipsterapp1.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.anderson.jhipsterapp1.web.rest.TestUtil;

public class ItemPedidoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPedido.class);
        ItemPedido itemPedido1 = new ItemPedido();
        itemPedido1.setId(1L);
        ItemPedido itemPedido2 = new ItemPedido();
        itemPedido2.setId(itemPedido1.getId());
        assertThat(itemPedido1).isEqualTo(itemPedido2);
        itemPedido2.setId(2L);
        assertThat(itemPedido1).isNotEqualTo(itemPedido2);
        itemPedido1.setId(null);
        assertThat(itemPedido1).isNotEqualTo(itemPedido2);
    }
}
