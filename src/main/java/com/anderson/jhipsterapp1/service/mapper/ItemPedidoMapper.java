package com.anderson.jhipsterapp1.service.mapper;

import com.anderson.jhipsterapp1.domain.ItemPedido;
import com.anderson.jhipsterapp1.domain.Pedido;
import com.anderson.jhipsterapp1.service.dto.ItemPedidoDTO;
import com.anderson.jhipsterapp1.service.dto.PedidoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ItemPedido} and its DTO {@link ItemPedidoDTO}.
 */
@Mapper(componentModel = "spring")
public interface ItemPedidoMapper extends EntityMapper<ItemPedidoDTO, ItemPedido> {
    @Mapping(target = "pedido", source = "pedido", qualifiedByName = "pedidoId")
    ItemPedidoDTO toDto(ItemPedido s);

    @Named("pedidoId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PedidoDTO toDtoPedidoId(Pedido pedido);
}
