package com.anderson.jhipsterapp1.web.rest;

import static com.anderson.jhipsterapp1.domain.TipoFestaAsserts.*;
import static com.anderson.jhipsterapp1.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.anderson.jhipsterapp1.IntegrationTest;
import com.anderson.jhipsterapp1.domain.TipoFesta;
import com.anderson.jhipsterapp1.repository.TipoFestaRepository;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;
import com.anderson.jhipsterapp1.service.mapper.TipoFestaMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
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
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TipoFestaRepository tipoFestaRepository;

    @Autowired
    private TipoFestaMapper tipoFestaMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoFestaMockMvc;

    private TipoFesta tipoFesta;

    private TipoFesta insertedTipoFesta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFesta createEntity() {
        return new TipoFesta().nome(DEFAULT_NOME).descricao(DEFAULT_DESCRICAO);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFesta createUpdatedEntity() {
        return new TipoFesta().nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);
    }

    @BeforeEach
    void initTest() {
        tipoFesta = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedTipoFesta != null) {
            tipoFestaRepository.delete(insertedTipoFesta);
            insertedTipoFesta = null;
        }
    }

    @Test
    @Transactional
    void createTipoFesta() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);
        var returnedTipoFestaDTO = om.readValue(
            restTipoFestaMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tipoFestaDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TipoFestaDTO.class
        );

        // Validate the TipoFesta in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTipoFesta = tipoFestaMapper.toEntity(returnedTipoFestaDTO);
        assertTipoFestaUpdatableFieldsEquals(returnedTipoFesta, getPersistedTipoFesta(returnedTipoFesta));

        insertedTipoFesta = returnedTipoFesta;
    }

    @Test
    @Transactional
    void createTipoFestaWithExistingId() throws Exception {
        // Create the TipoFesta with an existing ID
        tipoFesta.setId(1L);
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        tipoFesta.setNome(null);

        // Create the TipoFesta, which fails.
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        restTipoFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        tipoFesta.setDescricao(null);

        // Create the TipoFesta, which fails.
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        restTipoFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTipoFestas() throws Exception {
        // Initialize the database
        insertedTipoFesta = tipoFestaRepository.saveAndFlush(tipoFesta);

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
        insertedTipoFesta = tipoFestaRepository.saveAndFlush(tipoFesta);

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
        insertedTipoFesta = tipoFestaRepository.saveAndFlush(tipoFesta);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tipoFesta
        TipoFesta updatedTipoFesta = tipoFestaRepository.findById(tipoFesta.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTipoFesta are not directly saved in db
        em.detach(updatedTipoFesta);
        updatedTipoFesta.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(updatedTipoFesta);

        restTipoFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoFestaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tipoFestaDTO))
            )
            .andExpect(status().isOk());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTipoFestaToMatchAllProperties(updatedTipoFesta);
    }

    @Test
    @Transactional
    void putNonExistingTipoFesta() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tipoFesta.setId(longCount.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoFestaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoFesta() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tipoFesta.setId(longCount.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoFesta() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tipoFesta.setId(longCount.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tipoFestaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoFestaWithPatch() throws Exception {
        // Initialize the database
        insertedTipoFesta = tipoFestaRepository.saveAndFlush(tipoFesta);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tipoFesta using partial update
        TipoFesta partialUpdatedTipoFesta = new TipoFesta();
        partialUpdatedTipoFesta.setId(tipoFesta.getId());

        partialUpdatedTipoFesta.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoFesta.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTipoFesta))
            )
            .andExpect(status().isOk());

        // Validate the TipoFesta in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTipoFestaUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTipoFesta, tipoFesta),
            getPersistedTipoFesta(tipoFesta)
        );
    }

    @Test
    @Transactional
    void fullUpdateTipoFestaWithPatch() throws Exception {
        // Initialize the database
        insertedTipoFesta = tipoFestaRepository.saveAndFlush(tipoFesta);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tipoFesta using partial update
        TipoFesta partialUpdatedTipoFesta = new TipoFesta();
        partialUpdatedTipoFesta.setId(tipoFesta.getId());

        partialUpdatedTipoFesta.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoFesta.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTipoFesta))
            )
            .andExpect(status().isOk());

        // Validate the TipoFesta in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTipoFestaUpdatableFieldsEquals(partialUpdatedTipoFesta, getPersistedTipoFesta(partialUpdatedTipoFesta));
    }

    @Test
    @Transactional
    void patchNonExistingTipoFesta() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tipoFesta.setId(longCount.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoFestaDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoFesta() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tipoFesta.setId(longCount.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(tipoFestaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoFesta() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tipoFesta.setId(longCount.incrementAndGet());

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(tipoFestaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoFesta in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoFesta() throws Exception {
        // Initialize the database
        insertedTipoFesta = tipoFestaRepository.saveAndFlush(tipoFesta);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the tipoFesta
        restTipoFestaMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoFesta.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return tipoFestaRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected TipoFesta getPersistedTipoFesta(TipoFesta tipoFesta) {
        return tipoFestaRepository.findById(tipoFesta.getId()).orElseThrow();
    }

    protected void assertPersistedTipoFestaToMatchAllProperties(TipoFesta expectedTipoFesta) {
        assertTipoFestaAllPropertiesEquals(expectedTipoFesta, getPersistedTipoFesta(expectedTipoFesta));
    }

    protected void assertPersistedTipoFestaToMatchUpdatableProperties(TipoFesta expectedTipoFesta) {
        assertTipoFestaAllUpdatablePropertiesEquals(expectedTipoFesta, getPersistedTipoFesta(expectedTipoFesta));
    }
}
