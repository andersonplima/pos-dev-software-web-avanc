package com.anderson.jhipsterapp1.web.rest;

import com.anderson.jhipsterapp1.repository.TipoFestaRepository;
import com.anderson.jhipsterapp1.service.TipoFestaService;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;
import com.anderson.jhipsterapp1.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.anderson.jhipsterapp1.domain.TipoFesta}.
 */
@RestController
@RequestMapping("/api/tipo-festas")
public class TipoFestaResource {

    private static final Logger LOG = LoggerFactory.getLogger(TipoFestaResource.class);

    private static final String ENTITY_NAME = "tipoFesta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoFestaService tipoFestaService;

    private final TipoFestaRepository tipoFestaRepository;

    public TipoFestaResource(TipoFestaService tipoFestaService, TipoFestaRepository tipoFestaRepository) {
        this.tipoFestaService = tipoFestaService;
        this.tipoFestaRepository = tipoFestaRepository;
    }

    /**
     * {@code POST  /tipo-festas} : Create a new tipoFesta.
     *
     * @param tipoFestaDTO the tipoFestaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoFestaDTO, or with status {@code 400 (Bad Request)} if the tipoFesta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoFestaDTO> createTipoFesta(@Valid @RequestBody TipoFestaDTO tipoFestaDTO) throws URISyntaxException {
        LOG.debug("REST request to save TipoFesta : {}", tipoFestaDTO);
        if (tipoFestaDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoFesta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        tipoFestaDTO = tipoFestaService.save(tipoFestaDTO);
        return ResponseEntity.created(new URI("/api/tipo-festas/" + tipoFestaDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, tipoFestaDTO.getId().toString()))
            .body(tipoFestaDTO);
    }

    /**
     * {@code PUT  /tipo-festas/:id} : Updates an existing tipoFesta.
     *
     * @param id the id of the tipoFestaDTO to save.
     * @param tipoFestaDTO the tipoFestaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoFestaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoFestaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoFestaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoFestaDTO> updateTipoFesta(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoFestaDTO tipoFestaDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update TipoFesta : {}, {}", id, tipoFestaDTO);
        if (tipoFestaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoFestaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoFestaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        tipoFestaDTO = tipoFestaService.update(tipoFestaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoFestaDTO.getId().toString()))
            .body(tipoFestaDTO);
    }

    /**
     * {@code PATCH  /tipo-festas/:id} : Partial updates given fields of an existing tipoFesta, field will ignore if it is null
     *
     * @param id the id of the tipoFestaDTO to save.
     * @param tipoFestaDTO the tipoFestaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoFestaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoFestaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tipoFestaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoFestaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoFestaDTO> partialUpdateTipoFesta(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoFestaDTO tipoFestaDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update TipoFesta partially : {}, {}", id, tipoFestaDTO);
        if (tipoFestaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoFestaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoFestaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoFestaDTO> result = tipoFestaService.partialUpdate(tipoFestaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoFestaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-festas} : get all the tipoFestas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoFestas in body.
     */
    @GetMapping("")
    public List<TipoFestaDTO> getAllTipoFestas() {
        LOG.debug("REST request to get all TipoFestas");
        return tipoFestaService.findAll();
    }

    /**
     * {@code GET  /tipo-festas/:id} : get the "id" tipoFesta.
     *
     * @param id the id of the tipoFestaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoFestaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoFestaDTO> getTipoFesta(@PathVariable("id") Long id) {
        LOG.debug("REST request to get TipoFesta : {}", id);
        Optional<TipoFestaDTO> tipoFestaDTO = tipoFestaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoFestaDTO);
    }

    /**
     * {@code DELETE  /tipo-festas/:id} : delete the "id" tipoFesta.
     *
     * @param id the id of the tipoFestaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoFesta(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete TipoFesta : {}", id);
        tipoFestaService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
