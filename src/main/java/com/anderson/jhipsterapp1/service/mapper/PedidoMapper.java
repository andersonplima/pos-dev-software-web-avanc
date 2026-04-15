package com.anderson.jhipsterapp1.service.mapper;

import com.anderson.jhipsterapp1.domain.Pedido;
import com.anderson.jhipsterapp1.service.dto.PedidoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Pedido} and its DTO {@link PedidoDTO}.
 */
@Mapper(componentModel = "spring")
public interface PedidoMapper extends EntityMapper<PedidoDTO, Pedido> {}
