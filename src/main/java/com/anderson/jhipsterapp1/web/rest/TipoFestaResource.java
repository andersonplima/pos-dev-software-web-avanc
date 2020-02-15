package com.anderson.jhipsterapp1.web.rest;

import com.anderson.jhipsterapp1.service.TipoFestaService;
import com.anderson.jhipsterapp1.web.rest.errors.BadRequestAlertException;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.anderson.jhipsterapp1.domain.TipoFesta}.
 */
@RestController
@RequestMapping("/api")
public class TipoFestaResource {

    private final Logger log = LoggerFactory.getLogger(TipoFestaResource.class);

    private static final String ENTITY_NAME = "tipoFesta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoFestaService tipoFestaService;

    public TipoFestaResource(TipoFestaService tipoFestaService) {
        this.tipoFestaService = tipoFestaService;
    }

    /**
     * {@code POST  /tipo-festas} : Create a new tipoFesta.
     *
     * @param tipoFestaDTO the tipoFestaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoFestaDTO, or with status {@code 400 (Bad Request)} if the tipoFesta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-festas")
    public ResponseEntity<TipoFestaDTO> createTipoFesta(@Valid @RequestBody TipoFestaDTO tipoFestaDTO) throws URISyntaxException {
        log.debug("REST request to save TipoFesta : {}", tipoFestaDTO);
        if (tipoFestaDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoFesta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoFestaDTO result = tipoFestaService.save(tipoFestaDTO);
        return ResponseEntity.created(new URI("/api/tipo-festas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-festas} : Updates an existing tipoFesta.
     *
     * @param tipoFestaDTO the tipoFestaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoFestaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoFestaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoFestaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-festas")
    public ResponseEntity<TipoFestaDTO> updateTipoFesta(@Valid @RequestBody TipoFestaDTO tipoFestaDTO) throws URISyntaxException {
        log.debug("REST request to update TipoFesta : {}", tipoFestaDTO);
        if (tipoFestaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoFestaDTO result = tipoFestaService.save(tipoFestaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoFestaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-festas} : get all the tipoFestas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoFestas in body.
     */
    @GetMapping("/tipo-festas")
    public List<TipoFestaDTO> getAllTipoFestas() {
        log.debug("REST request to get all TipoFestas");
        return tipoFestaService.findAll();
    }

    /**
     * {@code GET  /tipo-festas/:id} : get the "id" tipoFesta.
     *
     * @param id the id of the tipoFestaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoFestaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-festas/{id}")
    public ResponseEntity<TipoFestaDTO> getTipoFesta(@PathVariable Long id) {
        log.debug("REST request to get TipoFesta : {}", id);
        Optional<TipoFestaDTO> tipoFestaDTO = tipoFestaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoFestaDTO);
    }

    /**
     * {@code DELETE  /tipo-festas/:id} : delete the "id" tipoFesta.
     *
     * @param id the id of the tipoFestaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-festas/{id}")
    public ResponseEntity<Void> deleteTipoFesta(@PathVariable Long id) {
        log.debug("REST request to delete TipoFesta : {}", id);
        tipoFestaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
