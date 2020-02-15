package com.anderson.jhipsterapp1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A ItemPedido.
 */
@Entity
@Table(name = "item_pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ItemPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome_item", nullable = false)
    private String nomeItem;

    @Column(name = "valor_item", precision = 21, scale = 2)
    private BigDecimal valorItem;

    @ManyToOne
    @JsonIgnoreProperties("itemPedidos")
    private Pedido pedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeItem() {
        return nomeItem;
    }

    public ItemPedido nomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
        return this;
    }

    public void setNomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
    }

    public BigDecimal getValorItem() {
        return valorItem;
    }

    public ItemPedido valorItem(BigDecimal valorItem) {
        this.valorItem = valorItem;
        return this;
    }

    public void setValorItem(BigDecimal valorItem) {
        this.valorItem = valorItem;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public ItemPedido pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemPedido)) {
            return false;
        }
        return id != null && id.equals(((ItemPedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ItemPedido{" +
            "id=" + getId() +
            ", nomeItem='" + getNomeItem() + "'" +
            ", valorItem=" + getValorItem() +
            "}";
    }
}
