package com.anderson.jhipsterapp1.service;

import com.anderson.jhipsterapp1.domain.TipoFesta;
import com.anderson.jhipsterapp1.repository.TipoFestaRepository;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;
import com.anderson.jhipsterapp1.service.mapper.TipoFestaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.anderson.jhipsterapp1.domain.TipoFesta}.
 */
@Service
@Transactional
public class TipoFestaService {

    private static final Logger LOG = LoggerFactory.getLogger(TipoFestaService.class);

    private final TipoFestaRepository tipoFestaRepository;

    private final TipoFestaMapper tipoFestaMapper;

    public TipoFestaService(TipoFestaRepository tipoFestaRepository, TipoFestaMapper tipoFestaMapper) {
        this.tipoFestaRepository = tipoFestaRepository;
        this.tipoFestaMapper = tipoFestaMapper;
    }

    /**
     * Save a tipoFesta.
     *
     * @param tipoFestaDTO the entity to save.
     * @return the persisted entity.
     */
    public TipoFestaDTO save(TipoFestaDTO tipoFestaDTO) {
        LOG.debug("Request to save TipoFesta : {}", tipoFestaDTO);
        TipoFesta tipoFesta = tipoFestaMapper.toEntity(tipoFestaDTO);
        tipoFesta = tipoFestaRepository.save(tipoFesta);
        return tipoFestaMapper.toDto(tipoFesta);
    }

    /**
     * Update a tipoFesta.
     *
     * @param tipoFestaDTO the entity to save.
     * @return the persisted entity.
     */
    public TipoFestaDTO update(TipoFestaDTO tipoFestaDTO) {
        LOG.debug("Request to update TipoFesta : {}", tipoFestaDTO);
        TipoFesta tipoFesta = tipoFestaMapper.toEntity(tipoFestaDTO);
        tipoFesta = tipoFestaRepository.save(tipoFesta);
        return tipoFestaMapper.toDto(tipoFesta);
    }

    /**
     * Partially update a tipoFesta.
     *
     * @param tipoFestaDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TipoFestaDTO> partialUpdate(TipoFestaDTO tipoFestaDTO) {
        LOG.debug("Request to partially update TipoFesta : {}", tipoFestaDTO);

        return tipoFestaRepository
            .findById(tipoFestaDTO.getId())
            .map(existingTipoFesta -> {
                tipoFestaMapper.partialUpdate(existingTipoFesta, tipoFestaDTO);

                return existingTipoFesta;
            })
            .map(tipoFestaRepository::save)
            .map(tipoFestaMapper::toDto);
    }

    /**
     * Get all the tipoFestas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TipoFestaDTO> findAll() {
        LOG.debug("Request to get all TipoFestas");
        return tipoFestaRepository.findAll().stream().map(tipoFestaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one tipoFesta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoFestaDTO> findOne(Long id) {
        LOG.debug("Request to get TipoFesta : {}", id);
        return tipoFestaRepository.findById(id).map(tipoFestaMapper::toDto);
    }

    /**
     * Delete the tipoFesta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete TipoFesta : {}", id);
        tipoFestaRepository.deleteById(id);
    }
}
