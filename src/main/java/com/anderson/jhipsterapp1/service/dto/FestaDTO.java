package com.anderson.jhipsterapp1.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.anderson.jhipsterapp1.domain.Festa} entity.
 */
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


    private Long tipoFestaId;

    private String tipoFestaNome;

    private Long clienteId;

    private String clienteCpf;

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

    public Long getTipoFestaId() {
        return tipoFestaId;
    }

    public void setTipoFestaId(Long tipoFestaId) {
        this.tipoFestaId = tipoFestaId;
    }

    public String getTipoFestaNome() {
        return tipoFestaNome;
    }

    public void setTipoFestaNome(String tipoFestaNome) {
        this.tipoFestaNome = tipoFestaNome;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteCpf() {
        return clienteCpf;
    }

    public void setClienteCpf(String clienteCpf) {
        this.clienteCpf = clienteCpf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FestaDTO festaDTO = (FestaDTO) o;
        if (festaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), festaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FestaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tema='" + getTema() + "'" +
            ", valor=" + getValor() +
            ", tipoFestaId=" + getTipoFestaId() +
            ", tipoFestaNome='" + getTipoFestaNome() + "'" +
            ", clienteId=" + getClienteId() +
            ", clienteCpf='" + getClienteCpf() + "'" +
            "}";
    }
}
