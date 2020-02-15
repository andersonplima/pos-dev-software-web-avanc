package com.anderson.jhipsterapp1.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link com.anderson.jhipsterapp1.domain.ItemPedido} entity.
 */
public class ItemPedidoDTO implements Serializable {

    private Long id;

    @NotNull
    private String nomeItem;

    private BigDecimal valorItem;


    private Long pedidoId;

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

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ItemPedidoDTO itemPedidoDTO = (ItemPedidoDTO) o;
        if (itemPedidoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), itemPedidoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ItemPedidoDTO{" +
            "id=" + getId() +
            ", nomeItem='" + getNomeItem() + "'" +
            ", valorItem=" + getValorItem() +
            ", pedidoId=" + getPedidoId() +
            "}";
    }
}
