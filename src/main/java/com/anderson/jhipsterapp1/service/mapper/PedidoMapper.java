package com.anderson.jhipsterapp1.service.mapper;


import com.anderson.jhipsterapp1.domain.*;
import com.anderson.jhipsterapp1.service.dto.PedidoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Pedido} and its DTO {@link PedidoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PedidoMapper extends EntityMapper<PedidoDTO, Pedido> {



    default Pedido fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pedido pedido = new Pedido();
        pedido.setId(id);
        return pedido;
    }
}
