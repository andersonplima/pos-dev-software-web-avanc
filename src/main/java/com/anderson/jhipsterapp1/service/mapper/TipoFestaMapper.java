package com.anderson.jhipsterapp1.service.mapper;

import com.anderson.jhipsterapp1.domain.TipoFesta;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoFesta} and its DTO {@link TipoFestaDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoFestaMapper extends EntityMapper<TipoFestaDTO, TipoFesta> {}
