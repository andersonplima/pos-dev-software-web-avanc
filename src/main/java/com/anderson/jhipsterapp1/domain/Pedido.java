package com.anderson.jhipsterapp1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_pedido")
    private Instant dataPedido;

    @NotNull
    @Column(name = "valor_pedido", precision = 21, scale = 2, nullable = false)
    private BigDecimal valorPedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataPedido() {
        return dataPedido;
    }

    public Pedido dataPedido(Instant dataPedido) {
        this.dataPedido = dataPedido;
        return this;
    }

    public void setDataPedido(Instant dataPedido) {
        this.dataPedido = dataPedido;
    }

    public BigDecimal getValorPedido() {
        return valorPedido;
    }

    public Pedido valorPedido(BigDecimal valorPedido) {
        this.valorPedido = valorPedido;
        return this;
    }

    public void setValorPedido(BigDecimal valorPedido) {
        this.valorPedido = valorPedido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pedido)) {
            return false;
        }
        return id != null && id.equals(((Pedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", dataPedido='" + getDataPedido() + "'" +
            ", valorPedido=" + getValorPedido() +
            "}";
    }
}
