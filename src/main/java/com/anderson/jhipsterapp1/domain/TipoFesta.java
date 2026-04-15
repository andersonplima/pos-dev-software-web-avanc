package com.anderson.jhipsterapp1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoFesta.
 */
@Entity
@Table(name = "tipo_festa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoFesta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "nome", length = 50, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 100)
    @Column(name = "descricao", length = 100, nullable = false)
    private String descricao;

    @OneToMany(mappedBy = "tipoFesta")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Festa> festas = new HashSet<>();

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

    public TipoFesta nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public TipoFesta descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Festa> getFestas() {
        return festas;
    }

    public TipoFesta festas(Set<Festa> festas) {
        this.festas = festas;
        return this;
    }

    public TipoFesta addFesta(Festa festa) {
        this.festas.add(festa);
        festa.setTipoFesta(this);
        return this;
    }

    public TipoFesta removeFesta(Festa festa) {
        this.festas.remove(festa);
        festa.setTipoFesta(null);
        return this;
    }

    public void setFestas(Set<Festa> festas) {
        this.festas = festas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoFesta)) {
            return false;
        }
        return id != null && id.equals(((TipoFesta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoFesta{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
