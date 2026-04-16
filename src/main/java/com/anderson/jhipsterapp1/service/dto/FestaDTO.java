package com.anderson.jhipsterapp1.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.anderson.jhipsterapp1.domain.Festa} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FestaDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String nome;

    @NotNull
    @Size(max = 50)
    private String tema;

    @NotNull
    @DecimalMin(value = "0")
    private Float valor;

    @NotNull
    private TipoFestaDTO tipoFesta;

    @NotNull
    private ClienteDTO cliente;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTema() {
        return tema;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public Float getValor() {
        return valor;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public TipoFestaDTO getTipoFesta() {
        return tipoFesta;
    }

    public void setTipoFesta(TipoFestaDTO tipoFesta) {
        this.tipoFesta = tipoFesta;
    }

    public ClienteDTO getCliente() {
        return cliente;
    }

    public void setCliente(ClienteDTO cliente) {
        this.cliente = cliente;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FestaDTO)) {
            return false;
        }

        FestaDTO festaDTO = (FestaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, festaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FestaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tema='" + getTema() + "'" +
            ", valor=" + getValor() +
            ", tipoFesta=" + getTipoFesta() +
            ", cliente=" + getCliente() +
            "}";
    }
}
