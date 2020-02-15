package com.anderson.jhipsterapp1.service.mapper;


import com.anderson.jhipsterapp1.domain.*;
import com.anderson.jhipsterapp1.service.dto.ClienteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cliente} and its DTO {@link ClienteDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClienteMapper extends EntityMapper<ClienteDTO, Cliente> {


    @Mapping(target = "festas", ignore = true)
    @Mapping(target = "removeFesta", ignore = true)
    Cliente toEntity(ClienteDTO clienteDTO);

    default Cliente fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cliente cliente = new Cliente();
        cliente.setId(id);
        return cliente;
    }
}
