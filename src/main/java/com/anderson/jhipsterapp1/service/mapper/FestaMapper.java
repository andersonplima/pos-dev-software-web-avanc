package com.anderson.jhipsterapp1.service.mapper;


import com.anderson.jhipsterapp1.domain.*;
import com.anderson.jhipsterapp1.service.dto.FestaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Festa} and its DTO {@link FestaDTO}.
 */
@Mapper(componentModel = "spring", uses = {TipoFestaMapper.class, ClienteMapper.class})
public interface FestaMapper extends EntityMapper<FestaDTO, Festa> {

    @Mapping(source = "tipoFesta.id", target = "tipoFestaId")
    @Mapping(source = "tipoFesta.nome", target = "tipoFestaNome")
    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.cpf", target = "clienteCpf")
    FestaDTO toDto(Festa festa);

    @Mapping(source = "tipoFestaId", target = "tipoFesta")
    @Mapping(source = "clienteId", target = "cliente")
    Festa toEntity(FestaDTO festaDTO);

    default Festa fromId(Long id) {
        if (id == null) {
            return null;
        }
        Festa festa = new Festa();
        festa.setId(id);
        return festa;
    }
}
