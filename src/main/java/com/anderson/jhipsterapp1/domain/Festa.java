package com.anderson.jhipsterapp1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Festa.
 */
@Entity
@Table(name = "festa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Festa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
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
    @JsonIgnoreProperties(value = { "festas" }, allowSetters = true)
    private TipoFesta tipoFesta;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "festas" }, allowSetters = true)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Festa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Festa nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTema() {
        return this.tema;
    }

    public Festa tema(String tema) {
        this.setTema(tema);
        return this;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public Float getValor() {
        return this.valor;
    }

    public Festa valor(Float valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public TipoFesta getTipoFesta() {
        return this.tipoFesta;
    }

    public void setTipoFesta(TipoFesta tipoFesta) {
        this.tipoFesta = tipoFesta;
    }

    public Festa tipoFesta(TipoFesta tipoFesta) {
        this.setTipoFesta(tipoFesta);
        return this;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Festa cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Festa)) {
            return false;
        }
        return getId() != null && getId().equals(((Festa) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
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
