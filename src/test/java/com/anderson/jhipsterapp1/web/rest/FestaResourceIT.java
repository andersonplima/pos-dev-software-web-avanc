package com.anderson.jhipsterapp1.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.anderson.jhipsterapp1.IntegrationTest;
import com.anderson.jhipsterapp1.domain.Cliente;
import com.anderson.jhipsterapp1.domain.Festa;
import com.anderson.jhipsterapp1.domain.TipoFesta;
import com.anderson.jhipsterapp1.repository.FestaRepository;
import com.anderson.jhipsterapp1.service.FestaService;
import com.anderson.jhipsterapp1.service.dto.FestaDTO;
import com.anderson.jhipsterapp1.service.mapper.FestaMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link FestaResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class FestaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_TEMA = "AAAAAAAAAA";
    private static final String UPDATED_TEMA = "BBBBBBBBBB";

    private static final Float DEFAULT_VALOR = 0F;
    private static final Float UPDATED_VALOR = 1F;

    private static final String ENTITY_API_URL = "/api/festas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FestaRepository festaRepository;

    @Mock
    private FestaRepository festaRepositoryMock;

    @Autowired
    private FestaMapper festaMapper;

    @Mock
    private FestaService festaServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFestaMockMvc;

    private Festa festa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Festa createEntity(EntityManager em) {
        Festa festa = new Festa().nome(DEFAULT_NOME).tema(DEFAULT_TEMA).valor(DEFAULT_VALOR);
        // Add required entity
        TipoFesta tipoFesta;
        if (TestUtil.findAll(em, TipoFesta.class).isEmpty()) {
            tipoFesta = TipoFestaResourceIT.createEntity(em);
            em.persist(tipoFesta);
            em.flush();
        } else {
            tipoFesta = TestUtil.findAll(em, TipoFesta.class).get(0);
        }
        festa.setTipoFesta(tipoFesta);
        // Add required entity
        Cliente cliente;
        if (TestUtil.findAll(em, Cliente.class).isEmpty()) {
            cliente = ClienteResourceIT.createEntity(em);
            em.persist(cliente);
            em.flush();
        } else {
            cliente = TestUtil.findAll(em, Cliente.class).get(0);
        }
        festa.setCliente(cliente);
        return festa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Festa createUpdatedEntity(EntityManager em) {
        Festa festa = new Festa().nome(UPDATED_NOME).tema(UPDATED_TEMA).valor(UPDATED_VALOR);
        // Add required entity
        TipoFesta tipoFesta;
        if (TestUtil.findAll(em, TipoFesta.class).isEmpty()) {
            tipoFesta = TipoFestaResourceIT.createUpdatedEntity(em);
            em.persist(tipoFesta);
            em.flush();
        } else {
            tipoFesta = TestUtil.findAll(em, TipoFesta.class).get(0);
        }
        festa.setTipoFesta(tipoFesta);
        // Add required entity
        Cliente cliente;
        if (TestUtil.findAll(em, Cliente.class).isEmpty()) {
            cliente = ClienteResourceIT.createUpdatedEntity(em);
            em.persist(cliente);
            em.flush();
        } else {
            cliente = TestUtil.findAll(em, Cliente.class).get(0);
        }
        festa.setCliente(cliente);
        return festa;
    }

    @BeforeEach
    public void initTest() {
        festa = createEntity(em);
    }

    @Test
    @Transactional
    void createFesta() throws Exception {
        int databaseSizeBeforeCreate = festaRepository.findAll().size();
        // Create the Festa
        FestaDTO festaDTO = festaMapper.toDto(festa);
        restFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(festaDTO)))
            .andExpect(status().isCreated());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeCreate + 1);
        Festa testFesta = festaList.get(festaList.size() - 1);
        assertThat(testFesta.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testFesta.getTema()).isEqualTo(DEFAULT_TEMA);
        assertThat(testFesta.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    void createFestaWithExistingId() throws Exception {
        // Create the Festa with an existing ID
        festa.setId(1L);
        FestaDTO festaDTO = festaMapper.toDto(festa);

        int databaseSizeBeforeCreate = festaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(festaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = festaRepository.findAll().size();
        // set the field null
        festa.setNome(null);

        // Create the Festa, which fails.
        FestaDTO festaDTO = festaMapper.toDto(festa);

        restFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(festaDTO)))
            .andExpect(status().isBadRequest());

        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTemaIsRequired() throws Exception {
        int databaseSizeBeforeTest = festaRepository.findAll().size();
        // set the field null
        festa.setTema(null);

        // Create the Festa, which fails.
        FestaDTO festaDTO = festaMapper.toDto(festa);

        restFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(festaDTO)))
            .andExpect(status().isBadRequest());

        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = festaRepository.findAll().size();
        // set the field null
        festa.setValor(null);

        // Create the Festa, which fails.
        FestaDTO festaDTO = festaMapper.toDto(festa);

        restFestaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(festaDTO)))
            .andExpect(status().isBadRequest());

        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllFestas() throws Exception {
        // Initialize the database
        festaRepository.saveAndFlush(festa);

        // Get all the festaList
        restFestaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(festa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].tema").value(hasItem(DEFAULT_TEMA)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFestasWithEagerRelationshipsIsEnabled() throws Exception {
        when(festaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFestaMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(festaServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFestasWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(festaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFestaMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(festaRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getFesta() throws Exception {
        // Initialize the database
        festaRepository.saveAndFlush(festa);

        // Get the festa
        restFestaMockMvc
            .perform(get(ENTITY_API_URL_ID, festa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(festa.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.tema").value(DEFAULT_TEMA))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingFesta() throws Exception {
        // Get the festa
        restFestaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFesta() throws Exception {
        // Initialize the database
        festaRepository.saveAndFlush(festa);

        int databaseSizeBeforeUpdate = festaRepository.findAll().size();

        // Update the festa
        Festa updatedFesta = festaRepository.findById(festa.getId()).get();
        // Disconnect from session so that the updates on updatedFesta are not directly saved in db
        em.detach(updatedFesta);
        updatedFesta.nome(UPDATED_NOME).tema(UPDATED_TEMA).valor(UPDATED_VALOR);
        FestaDTO festaDTO = festaMapper.toDto(updatedFesta);

        restFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, festaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(festaDTO))
            )
            .andExpect(status().isOk());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
        Festa testFesta = festaList.get(festaList.size() - 1);
        assertThat(testFesta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFesta.getTema()).isEqualTo(UPDATED_TEMA);
        assertThat(testFesta.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void putNonExistingFesta() throws Exception {
        int databaseSizeBeforeUpdate = festaRepository.findAll().size();
        festa.setId(count.incrementAndGet());

        // Create the Festa
        FestaDTO festaDTO = festaMapper.toDto(festa);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, festaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(festaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFesta() throws Exception {
        int databaseSizeBeforeUpdate = festaRepository.findAll().size();
        festa.setId(count.incrementAndGet());

        // Create the Festa
        FestaDTO festaDTO = festaMapper.toDto(festa);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFestaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(festaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFesta() throws Exception {
        int databaseSizeBeforeUpdate = festaRepository.findAll().size();
        festa.setId(count.incrementAndGet());

        // Create the Festa
        FestaDTO festaDTO = festaMapper.toDto(festa);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFestaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(festaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFestaWithPatch() throws Exception {
        // Initialize the database
        festaRepository.saveAndFlush(festa);

        int databaseSizeBeforeUpdate = festaRepository.findAll().size();

        // Update the festa using partial update
        Festa partialUpdatedFesta = new Festa();
        partialUpdatedFesta.setId(festa.getId());

        partialUpdatedFesta.nome(UPDATED_NOME).valor(UPDATED_VALOR);

        restFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFesta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFesta))
            )
            .andExpect(status().isOk());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
        Festa testFesta = festaList.get(festaList.size() - 1);
        assertThat(testFesta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFesta.getTema()).isEqualTo(DEFAULT_TEMA);
        assertThat(testFesta.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void fullUpdateFestaWithPatch() throws Exception {
        // Initialize the database
        festaRepository.saveAndFlush(festa);

        int databaseSizeBeforeUpdate = festaRepository.findAll().size();

        // Update the festa using partial update
        Festa partialUpdatedFesta = new Festa();
        partialUpdatedFesta.setId(festa.getId());

        partialUpdatedFesta.nome(UPDATED_NOME).tema(UPDATED_TEMA).valor(UPDATED_VALOR);

        restFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFesta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFesta))
            )
            .andExpect(status().isOk());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
        Festa testFesta = festaList.get(festaList.size() - 1);
        assertThat(testFesta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFesta.getTema()).isEqualTo(UPDATED_TEMA);
        assertThat(testFesta.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void patchNonExistingFesta() throws Exception {
        int databaseSizeBeforeUpdate = festaRepository.findAll().size();
        festa.setId(count.incrementAndGet());

        // Create the Festa
        FestaDTO festaDTO = festaMapper.toDto(festa);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, festaDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(festaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFesta() throws Exception {
        int databaseSizeBeforeUpdate = festaRepository.findAll().size();
        festa.setId(count.incrementAndGet());

        // Create the Festa
        FestaDTO festaDTO = festaMapper.toDto(festa);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFestaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(festaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFesta() throws Exception {
        int databaseSizeBeforeUpdate = festaRepository.findAll().size();
        festa.setId(count.incrementAndGet());

        // Create the Festa
        FestaDTO festaDTO = festaMapper.toDto(festa);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFestaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(festaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Festa in the database
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFesta() throws Exception {
        // Initialize the database
        festaRepository.saveAndFlush(festa);

        int databaseSizeBeforeDelete = festaRepository.findAll().size();

        // Delete the festa
        restFestaMockMvc
            .perform(delete(ENTITY_API_URL_ID, festa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Festa> festaList = festaRepository.findAll();
        assertThat(festaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
