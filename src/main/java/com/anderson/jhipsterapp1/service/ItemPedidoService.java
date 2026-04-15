package com.anderson.jhipsterapp1.service;

import com.anderson.jhipsterapp1.service.dto.ItemPedidoDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.anderson.jhipsterapp1.domain.ItemPedido}.
 */
public interface ItemPedidoService {
    /**
     * Save a itemPedido.
     *
     * @param itemPedidoDTO the entity to save.
     * @return the persisted entity.
     */
    ItemPedidoDTO save(ItemPedidoDTO itemPedidoDTO);

    /**
     * Updates a itemPedido.
     *
     * @param itemPedidoDTO the entity to update.
     * @return the persisted entity.
     */
    ItemPedidoDTO update(ItemPedidoDTO itemPedidoDTO);

    /**
     * Partially updates a itemPedido.
     *
     * @param itemPedidoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ItemPedidoDTO> partialUpdate(ItemPedidoDTO itemPedidoDTO);

    /**
     * Get all the itemPedidos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemPedidoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" itemPedido.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemPedidoDTO> findOne(Long id);

    /**
     * Delete the "id" itemPedido.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
