package com.anderson.jhipsterapp1.service.impl;

import com.anderson.jhipsterapp1.service.ItemPedidoService;
import com.anderson.jhipsterapp1.domain.ItemPedido;
import com.anderson.jhipsterapp1.repository.ItemPedidoRepository;
import com.anderson.jhipsterapp1.service.dto.ItemPedidoDTO;
import com.anderson.jhipsterapp1.service.mapper.ItemPedidoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ItemPedido}.
 */
@Service
@Transactional
public class ItemPedidoServiceImpl implements ItemPedidoService {

    private final Logger log = LoggerFactory.getLogger(ItemPedidoServiceImpl.class);

    private final ItemPedidoRepository itemPedidoRepository;

    private final ItemPedidoMapper itemPedidoMapper;

    public ItemPedidoServiceImpl(ItemPedidoRepository itemPedidoRepository, ItemPedidoMapper itemPedidoMapper) {
        this.itemPedidoRepository = itemPedidoRepository;
        this.itemPedidoMapper = itemPedidoMapper;
    }

    /**
     * Save a itemPedido.
     *
     * @param itemPedidoDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ItemPedidoDTO save(ItemPedidoDTO itemPedidoDTO) {
        log.debug("Request to save ItemPedido : {}", itemPedidoDTO);
        ItemPedido itemPedido = itemPedidoMapper.toEntity(itemPedidoDTO);
        itemPedido = itemPedidoRepository.save(itemPedido);
        return itemPedidoMapper.toDto(itemPedido);
    }

    /**
     * Get all the itemPedidos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ItemPedidoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ItemPedidos");
        return itemPedidoRepository.findAll(pageable)
            .map(itemPedidoMapper::toDto);
    }

    /**
     * Get one itemPedido by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ItemPedidoDTO> findOne(Long id) {
        log.debug("Request to get ItemPedido : {}", id);
        return itemPedidoRepository.findById(id)
            .map(itemPedidoMapper::toDto);
    }

    /**
     * Delete the itemPedido by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemPedido : {}", id);
        itemPedidoRepository.deleteById(id);
    }
}
