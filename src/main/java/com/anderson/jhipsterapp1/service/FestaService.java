package com.anderson.jhipsterapp1.service;

import com.anderson.jhipsterapp1.domain.Festa;
import com.anderson.jhipsterapp1.repository.FestaRepository;
import com.anderson.jhipsterapp1.service.dto.FestaDTO;
import com.anderson.jhipsterapp1.service.mapper.FestaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Festa}.
 */
@Service
@Transactional
public class FestaService {

    private final Logger log = LoggerFactory.getLogger(FestaService.class);

    private final FestaRepository festaRepository;

    private final FestaMapper festaMapper;

    public FestaService(FestaRepository festaRepository, FestaMapper festaMapper) {
        this.festaRepository = festaRepository;
        this.festaMapper = festaMapper;
    }

    /**
     * Save a festa.
     *
     * @param festaDTO the entity to save.
     * @return the persisted entity.
     */
    public FestaDTO save(FestaDTO festaDTO) {
        log.debug("Request to save Festa : {}", festaDTO);
        Festa festa = festaMapper.toEntity(festaDTO);
        festa = festaRepository.save(festa);
        return festaMapper.toDto(festa);
    }

    /**
     * Update a festa.
     *
     * @param festaDTO the entity to save.
     * @return the persisted entity.
     */
    public FestaDTO update(FestaDTO festaDTO) {
        log.debug("Request to update Festa : {}", festaDTO);
        Festa festa = festaMapper.toEntity(festaDTO);
        festa = festaRepository.save(festa);
        return festaMapper.toDto(festa);
    }

    /**
     * Partially update a festa.
     *
     * @param festaDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FestaDTO> partialUpdate(FestaDTO festaDTO) {
        log.debug("Request to partially update Festa : {}", festaDTO);

        return festaRepository
            .findById(festaDTO.getId())
            .map(existingFesta -> {
                festaMapper.partialUpdate(existingFesta, festaDTO);

                return existingFesta;
            })
            .map(festaRepository::save)
            .map(festaMapper::toDto);
    }

    /**
     * Get all the festas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FestaDTO> findAll() {
        log.debug("Request to get all Festas");
        return festaRepository.findAll().stream().map(festaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the festas with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<FestaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return festaRepository.findAllWithEagerRelationships(pageable).map(festaMapper::toDto);
    }

    /**
     * Get one festa by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FestaDTO> findOne(Long id) {
        log.debug("Request to get Festa : {}", id);
        return festaRepository.findOneWithEagerRelationships(id).map(festaMapper::toDto);
    }

    /**
     * Delete the festa by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Festa : {}", id);
        festaRepository.deleteById(id);
    }
}
