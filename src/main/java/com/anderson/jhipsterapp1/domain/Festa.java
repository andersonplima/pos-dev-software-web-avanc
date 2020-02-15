package com.anderson.jhipsterapp1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Festa.
 */
@Entity
@Table(name = "festa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Festa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 50)
    @Column(name = "tema", length = 50, nullable = false)
    private String tema;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "valor", nullable = false)
    private Float valor;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("festas")
    private TipoFesta tipoFesta;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("festas")
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Festa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTema() {
        return tema;
    }

    public Festa tema(String tema) {
        this.tema = tema;
        return this;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public Float getValor() {
        return valor;
    }

    public Festa valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public TipoFesta getTipoFesta() {
        return tipoFesta;
    }

    public Festa tipoFesta(TipoFesta tipoFesta) {
        this.tipoFesta = tipoFesta;
        return this;
    }

    public void setTipoFesta(TipoFesta tipoFesta) {
        this.tipoFesta = tipoFesta;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Festa cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Festa)) {
            return false;
        }
        return id != null && id.equals(((Festa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Festa{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tema='" + getTema() + "'" +
            ", valor=" + getValor() +
            "}";
    }
}
