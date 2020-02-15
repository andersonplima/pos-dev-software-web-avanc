package com.anderson.jhipsterapp1.web.rest;

import com.anderson.jhipsterapp1.service.ItemPedidoService;
import com.anderson.jhipsterapp1.web.rest.errors.BadRequestAlertException;
import com.anderson.jhipsterapp1.service.dto.ItemPedidoDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.anderson.jhipsterapp1.domain.ItemPedido}.
 */
@RestController
@RequestMapping("/api")
public class ItemPedidoResource {

    private final Logger log = LoggerFactory.getLogger(ItemPedidoResource.class);

    private static final String ENTITY_NAME = "itemPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemPedidoService itemPedidoService;

    public ItemPedidoResource(ItemPedidoService itemPedidoService) {
        this.itemPedidoService = itemPedidoService;
    }

    /**
     * {@code POST  /item-pedidos} : Create a new itemPedido.
     *
     * @param itemPedidoDTO the itemPedidoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemPedidoDTO, or with status {@code 400 (Bad Request)} if the itemPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-pedidos")
    public ResponseEntity<ItemPedidoDTO> createItemPedido(@Valid @RequestBody ItemPedidoDTO itemPedidoDTO) throws URISyntaxException {
        log.debug("REST request to save ItemPedido : {}", itemPedidoDTO);
        if (itemPedidoDTO.getId() != null) {
            throw new BadRequestAlertException("A new itemPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemPedidoDTO result = itemPedidoService.save(itemPedidoDTO);
        return ResponseEntity.created(new URI("/api/item-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-pedidos} : Updates an existing itemPedido.
     *
     * @param itemPedidoDTO the itemPedidoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemPedidoDTO,
     * or with status {@code 400 (Bad Request)} if the itemPedidoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemPedidoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-pedidos")
    public ResponseEntity<ItemPedidoDTO> updateItemPedido(@Valid @RequestBody ItemPedidoDTO itemPedidoDTO) throws URISyntaxException {
        log.debug("REST request to update ItemPedido : {}", itemPedidoDTO);
        if (itemPedidoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemPedidoDTO result = itemPedidoService.save(itemPedidoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemPedidoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-pedidos} : get all the itemPedidos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemPedidos in body.
     */
    @GetMapping("/item-pedidos")
    public ResponseEntity<List<ItemPedidoDTO>> getAllItemPedidos(Pageable pageable) {
        log.debug("REST request to get a page of ItemPedidos");
        Page<ItemPedidoDTO> page = itemPedidoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-pedidos/:id} : get the "id" itemPedido.
     *
     * @param id the id of the itemPedidoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemPedidoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-pedidos/{id}")
    public ResponseEntity<ItemPedidoDTO> getItemPedido(@PathVariable Long id) {
        log.debug("REST request to get ItemPedido : {}", id);
        Optional<ItemPedidoDTO> itemPedidoDTO = itemPedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemPedidoDTO);
    }

    /**
     * {@code DELETE  /item-pedidos/:id} : delete the "id" itemPedido.
     *
     * @param id the id of the itemPedidoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-pedidos/{id}")
    public ResponseEntity<Void> deleteItemPedido(@PathVariable Long id) {
        log.debug("REST request to delete ItemPedido : {}", id);
        itemPedidoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
