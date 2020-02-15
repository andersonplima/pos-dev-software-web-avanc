package com.anderson.jhipsterapp1.repository;

import com.anderson.jhipsterapp1.domain.ItemPedido;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ItemPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {

}
