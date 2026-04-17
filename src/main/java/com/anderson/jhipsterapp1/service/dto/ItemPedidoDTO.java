package com.anderson.jhipsterapp1.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link com.anderson.jhipsterapp1.domain.ItemPedido} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ItemPedidoDTO implements Serializable {

    private Long id;

    @NotNull
    private String nomeItem;

    private BigDecimal valorItem;

    private PedidoDTO pedido;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeItem() {
        return nomeItem;
    }

    public void setNomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
    }

    public BigDecimal getValorItem() {
        return valorItem;
    }

    public void setValorItem(BigDecimal valorItem) {
        this.valorItem = valorItem;
    }

    public PedidoDTO getPedido() {
        return pedido;
    }

    public void setPedido(PedidoDTO pedido) {
        this.pedido = pedido;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemPedidoDTO)) {
            return false;
        }

        ItemPedidoDTO itemPedidoDTO = (ItemPedidoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, itemPedidoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemPedidoDTO{" +
            "id=" + getId() +
            ", nomeItem='" + getNomeItem() + "'" +
            ", valorItem=" + getValorItem() +
            ", pedido=" + getPedido() +
            "}";
    }
}
