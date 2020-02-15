package com.anderson.jhipsterapp1.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.anderson.jhipsterapp1.web.rest.TestUtil;

public class ItemPedidoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPedidoDTO.class);
        ItemPedidoDTO itemPedidoDTO1 = new ItemPedidoDTO();
        itemPedidoDTO1.setId(1L);
        ItemPedidoDTO itemPedidoDTO2 = new ItemPedidoDTO();
        assertThat(itemPedidoDTO1).isNotEqualTo(itemPedidoDTO2);
        itemPedidoDTO2.setId(itemPedidoDTO1.getId());
        assertThat(itemPedidoDTO1).isEqualTo(itemPedidoDTO2);
        itemPedidoDTO2.setId(2L);
        assertThat(itemPedidoDTO1).isNotEqualTo(itemPedidoDTO2);
        itemPedidoDTO1.setId(null);
        assertThat(itemPedidoDTO1).isNotEqualTo(itemPedidoDTO2);
    }
}
