package com.anderson.jhipsterapp1.service.mapper;


import com.anderson.jhipsterapp1.domain.*;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoFesta} and its DTO {@link TipoFestaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TipoFestaMapper extends EntityMapper<TipoFestaDTO, TipoFesta> {


    @Mapping(target = "festas", ignore = true)
    @Mapping(target = "removeFesta", ignore = true)
    TipoFesta toEntity(TipoFestaDTO tipoFestaDTO);

    default TipoFesta fromId(Long id) {
        if (id == null) {
            return null;
        }
        TipoFesta tipoFesta = new TipoFesta();
        tipoFesta.setId(id);
        return tipoFesta;
    }
}
