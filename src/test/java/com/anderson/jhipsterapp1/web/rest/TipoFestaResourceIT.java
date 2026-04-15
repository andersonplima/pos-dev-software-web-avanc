package com.anderson.jhipsterapp1.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.anderson.jhipsterapp1.IntegrationTest;
import com.anderson.jhipsterapp1.domain.TipoFesta;
import com.anderson.jhipsterapp1.repository.TipoFestaRepository;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;
import com.anderson.jhipsterapp1.service.mapper.TipoFestaMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TipoFestaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoFestaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipo-festas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TipoFestaRepository tipoFestaRepository;

    @Autowired
    private TipoFestaMapper tipoFestaMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoFestaMockMvc;

    private TipoFesta tipoFesta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFesta createEntity(EntityManager em) {
        TipoFesta tipoFesta = new TipoFesta().nome(DEFAULT_NOME).descricao(DEFAULT_DESCRICAO);
        return tipoFesta;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFesta createUpdatedEntity(EntityManager em) {
        TipoFesta tipoFesta = new TipoFesta().nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);
        return tipoFesta;
    }

    @BeforeEach
    public void initTest() {
        tipoFesta = createEntity(em);
    }

    @Test
    @Transactional
    void createTipoFesta() throws Exception {
        int databaseSizeBeforeCreate = tipoFestaRepository.findAll().size();
        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);
        restTipoFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoFesta testTipoFesta = tipoFestaList.get(tipoFestaList.size() - 1);
        assertThat(testTipoFesta.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTipoFesta.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createTipoFestaWithExistingId() throws Exception {
        // Create the TipoFesta with an existing ID
        tipoFesta.setId(1L);
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        int databaseSizeBeforeCreate = tipoFestaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoFestaRepository.findAll().size();
        // set the field null
        tipoFesta.setNome(null);

        // Create the TipoFesta, which fails.
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        restTipoFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoFestaRepository.findAll().size();
        // set the field null
        tipoFesta.setDescricao(null);

        // Create the TipoFesta, which fails.
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        restTipoFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTipoFestas() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        // Get all the tipoFestaList
        restTipoFestaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoFesta.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getTipoFesta() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        // Get the tipoFesta
        restTipoFestaMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoFesta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoFesta.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingTipoFesta() throws Exception {
        // Get the tipoFesta
        restTipoFestaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTipoFesta() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();

        // Update the tipoFesta
        TipoFesta updatedTipoFesta = tipoFestaRepository.findById(tipoFesta.getId()).get();
        // Disconnect from session so that the updates on updatedTipoFesta are not directly saved in db
        em.detach(updatedTipoFesta);
        updatedTipoFesta.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(updatedTipoFesta);

        restTipoFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoFestaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO))
            )
            .andExpect(status().isOk());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
        TipoFesta testTipoFesta = tipoFestaList.get(tipoFestaList.size() - 1);
        assertThat(testTipoFesta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTipoFesta.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingTipoFesta() throws Exception {
        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();
        tipoFesta.setId(count.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoFestaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoFesta() throws Exception {
        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();
        tipoFesta.setId(count.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoFesta() throws Exception {
        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();
        tipoFesta.setId(count.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoFestaWithPatch() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();

        // Update the tipoFesta using partial update
        TipoFesta partialUpdatedTipoFesta = new TipoFesta();
        partialUpdatedTipoFesta.setId(tipoFesta.getId());

        partialUpdatedTipoFesta.nome(UPDATED_NOME);

        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoFesta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoFesta))
            )
            .andExpect(status().isOk());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
        TipoFesta testTipoFesta = tipoFestaList.get(tipoFestaList.size() - 1);
        assertThat(testTipoFesta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTipoFesta.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateTipoFestaWithPatch() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();

        // Update the tipoFesta using partial update
        TipoFesta partialUpdatedTipoFesta = new TipoFesta();
        partialUpdatedTipoFesta.setId(tipoFesta.getId());

        partialUpdatedTipoFesta.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoFesta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoFesta))
            )
            .andExpect(status().isOk());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
        TipoFesta testTipoFesta = tipoFestaList.get(tipoFestaList.size() - 1);
        assertThat(testTipoFesta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTipoFesta.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingTipoFesta() throws Exception {
        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();
        tipoFesta.setId(count.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoFestaDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoFesta() throws Exception {
        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();
        tipoFesta.setId(count.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoFesta() throws Exception {
        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();
        tipoFesta.setId(count.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoFesta() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        int databaseSizeBeforeDelete = tipoFestaRepository.findAll().size();

        // Delete the tipoFesta
        restTipoFestaMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoFesta.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
