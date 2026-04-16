package com.anderson.jhipsterapp1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "data_pedido")
    private Instant dataPedido;

    @NotNull
    @Column(name = "valor_pedido", precision = 21, scale = 2, nullable = false)
    private BigDecimal valorPedido;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "pedido")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pedido" }, allowSetters = true)
    private Set<ItemPedido> itemPedidos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pedido id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataPedido() {
        return this.dataPedido;
    }

    public Pedido dataPedido(Instant dataPedido) {
        this.setDataPedido(dataPedido);
        return this;
    }

    public void setDataPedido(Instant dataPedido) {
        this.dataPedido = dataPedido;
    }

    public BigDecimal getValorPedido() {
        return this.valorPedido;
    }

    public Pedido valorPedido(BigDecimal valorPedido) {
        this.setValorPedido(valorPedido);
        return this;
    }

    public void setValorPedido(BigDecimal valorPedido) {
        this.valorPedido = valorPedido;
    }

    public Set<ItemPedido> getItemPedidos() {
        return this.itemPedidos;
    }

    public void setItemPedidos(Set<ItemPedido> itemPedidos) {
        if (this.itemPedidos != null) {
            this.itemPedidos.forEach(i -> i.setPedido(null));
        }
        if (itemPedidos != null) {
            itemPedidos.forEach(i -> i.setPedido(this));
        }
        this.itemPedidos = itemPedidos;
    }

    public Pedido itemPedidos(Set<ItemPedido> itemPedidos) {
        this.setItemPedidos(itemPedidos);
        return this;
    }

    public Pedido addItemPedido(ItemPedido itemPedido) {
        this.itemPedidos.add(itemPedido);
        itemPedido.setPedido(this);
        return this;
    }

    public Pedido removeItemPedido(ItemPedido itemPedido) {
        this.itemPedidos.remove(itemPedido);
        itemPedido.setPedido(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pedido)) {
            return false;
        }
        return getId() != null && getId().equals(((Pedido) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", dataPedido='" + getDataPedido() + "'" +
            ", valorPedido=" + getValorPedido() +
            "}";
    }
}
