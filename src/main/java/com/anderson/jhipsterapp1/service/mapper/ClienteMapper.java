package com.anderson.jhipsterapp1.service.mapper;

import com.anderson.jhipsterapp1.domain.Cliente;
import com.anderson.jhipsterapp1.service.dto.ClienteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cliente} and its DTO {@link ClienteDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClienteMapper extends EntityMapper<ClienteDTO, Cliente> {}
