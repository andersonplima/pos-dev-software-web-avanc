package com.anderson.jhipsterapp1.web.rest;

import com.anderson.jhipsterapp1.repository.FestaRepository;
import com.anderson.jhipsterapp1.service.FestaService;
import com.anderson.jhipsterapp1.service.dto.FestaDTO;
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
 * REST controller for managing {@link com.anderson.jhipsterapp1.domain.Festa}.
 */
@RestController
@RequestMapping("/api/festas")
public class FestaResource {

    private static final Logger LOG = LoggerFactory.getLogger(FestaResource.class);

    private static final String ENTITY_NAME = "festa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FestaService festaService;

    private final FestaRepository festaRepository;

    public FestaResource(FestaService festaService, FestaRepository festaRepository) {
        this.festaService = festaService;
        this.festaRepository = festaRepository;
    }

    /**
     * {@code POST  /festas} : Create a new festa.
     *
     * @param festaDTO the festaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new festaDTO, or with status {@code 400 (Bad Request)} if the festa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<FestaDTO> createFesta(@Valid @RequestBody FestaDTO festaDTO) throws URISyntaxException {
        LOG.debug("REST request to save Festa : {}", festaDTO);
        if (festaDTO.getId() != null) {
            throw new BadRequestAlertException("A new festa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        festaDTO = festaService.save(festaDTO);
        return ResponseEntity.created(new URI("/api/festas/" + festaDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, festaDTO.getId().toString()))
            .body(festaDTO);
    }

    /**
     * {@code PUT  /festas/:id} : Updates an existing festa.
     *
     * @param id the id of the festaDTO to save.
     * @param festaDTO the festaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated festaDTO,
     * or with status {@code 400 (Bad Request)} if the festaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the festaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<FestaDTO> updateFesta(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FestaDTO festaDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Festa : {}, {}", id, festaDTO);
        if (festaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, festaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!festaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        festaDTO = festaService.update(festaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, festaDTO.getId().toString()))
            .body(festaDTO);
    }

    /**
     * {@code PATCH  /festas/:id} : Partial updates given fields of an existing festa, field will ignore if it is null
     *
     * @param id the id of the festaDTO to save.
     * @param festaDTO the festaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated festaDTO,
     * or with status {@code 400 (Bad Request)} if the festaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the festaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the festaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FestaDTO> partialUpdateFesta(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FestaDTO festaDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Festa partially : {}, {}", id, festaDTO);
        if (festaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, festaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!festaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FestaDTO> result = festaService.partialUpdate(festaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, festaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /festas} : get all the festas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of festas in body.
     */
    @GetMapping("")
    public List<FestaDTO> getAllFestas(@RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        LOG.debug("REST request to get all Festas");
        return festaService.findAll();
    }

    /**
     * {@code GET  /festas/:id} : get the "id" festa.
     *
     * @param id the id of the festaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the festaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<FestaDTO> getFesta(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Festa : {}", id);
        Optional<FestaDTO> festaDTO = festaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(festaDTO);
    }

    /**
     * {@code DELETE  /festas/:id} : delete the "id" festa.
     *
     * @param id the id of the festaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFesta(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Festa : {}", id);
        festaService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
