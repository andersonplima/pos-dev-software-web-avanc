package com.anderson.jhipsterapp1.service.mapper;

import com.anderson.jhipsterapp1.domain.Cliente;
import com.anderson.jhipsterapp1.domain.Festa;
import com.anderson.jhipsterapp1.domain.TipoFesta;
import com.anderson.jhipsterapp1.service.dto.ClienteDTO;
import com.anderson.jhipsterapp1.service.dto.FestaDTO;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Festa} and its DTO {@link FestaDTO}.
 */
@Mapper(componentModel = "spring")
public interface FestaMapper extends EntityMapper<FestaDTO, Festa> {
    @Mapping(target = "tipoFesta", source = "tipoFesta", qualifiedByName = "tipoFestaNome")
    @Mapping(target = "cliente", source = "cliente", qualifiedByName = "clienteCpf")
    FestaDTO toDto(Festa s);

    @Named("tipoFestaNome")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nome", source = "nome")
    TipoFestaDTO toDtoTipoFestaNome(TipoFesta tipoFesta);

    @Named("clienteCpf")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "cpf", source = "cpf")
    ClienteDTO toDtoClienteCpf(Cliente cliente);
}
