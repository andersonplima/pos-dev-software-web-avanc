package com.anderson.jhipsterapp1.service.mapper;


import com.anderson.jhipsterapp1.domain.*;
import com.anderson.jhipsterapp1.service.dto.ItemPedidoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ItemPedido} and its DTO {@link ItemPedidoDTO}.
 */
@Mapper(componentModel = "spring", uses = {PedidoMapper.class})
public interface ItemPedidoMapper extends EntityMapper<ItemPedidoDTO, ItemPedido> {

    @Mapping(source = "pedido.id", target = "pedidoId")
    ItemPedidoDTO toDto(ItemPedido itemPedido);

    @Mapping(source = "pedidoId", target = "pedido")
    ItemPedido toEntity(ItemPedidoDTO itemPedidoDTO);

    default ItemPedido fromId(Long id) {
        if (id == null) {
            return null;
        }
        ItemPedido itemPedido = new ItemPedido();
        itemPedido.setId(id);
        return itemPedido;
    }
}
