package com.anderson.jhipsterapp1.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.anderson.jhipsterapp1.domain.TipoFesta} entity.
 */
public class TipoFestaDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 50)
    private String nome;

    @NotNull
    @Size(max = 100)
    private String descricao;


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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TipoFestaDTO tipoFestaDTO = (TipoFestaDTO) o;
        if (tipoFestaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoFestaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoFestaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
