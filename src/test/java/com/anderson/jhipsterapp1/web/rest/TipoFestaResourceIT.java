package com.anderson.jhipsterapp1.web.rest;

import com.anderson.jhipsterapp1.Jhipsterapp1App;
import com.anderson.jhipsterapp1.domain.TipoFesta;
import com.anderson.jhipsterapp1.repository.TipoFestaRepository;
import com.anderson.jhipsterapp1.service.TipoFestaService;
import com.anderson.jhipsterapp1.service.dto.TipoFestaDTO;
import com.anderson.jhipsterapp1.service.mapper.TipoFestaMapper;
import com.anderson.jhipsterapp1.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.anderson.jhipsterapp1.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoFestaResource} REST controller.
 */
@SpringBootTest(classes = Jhipsterapp1App.class)
public class TipoFestaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private TipoFestaRepository tipoFestaRepository;

    @Autowired
    private TipoFestaMapper tipoFestaMapper;

    @Autowired
    private TipoFestaService tipoFestaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTipoFestaMockMvc;

    private TipoFesta tipoFesta;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoFestaResource tipoFestaResource = new TipoFestaResource(tipoFestaService);
        this.restTipoFestaMockMvc = MockMvcBuilders.standaloneSetup(tipoFestaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFesta createEntity(EntityManager em) {
        TipoFesta tipoFesta = new TipoFesta()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO);
        return tipoFesta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoFesta createUpdatedEntity(EntityManager em) {
        TipoFesta tipoFesta = new TipoFesta()
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO);
        return tipoFesta;
    }

    @BeforeEach
    public void initTest() {
        tipoFesta = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoFesta() throws Exception {
        int databaseSizeBeforeCreate = tipoFestaRepository.findAll().size();

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);
        restTipoFestaMockMvc.perform(post("/api/tipo-festas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
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
    public void createTipoFestaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoFestaRepository.findAll().size();

        // Create the TipoFesta with an existing ID
        tipoFesta.setId(1L);
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoFestaMockMvc.perform(post("/api/tipo-festas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoFestaRepository.findAll().size();
        // set the field null
        tipoFesta.setNome(null);

        // Create the TipoFesta, which fails.
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        restTipoFestaMockMvc.perform(post("/api/tipo-festas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoFestaRepository.findAll().size();
        // set the field null
        tipoFesta.setDescricao(null);

        // Create the TipoFesta, which fails.
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        restTipoFestaMockMvc.perform(post("/api/tipo-festas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoFestas() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        // Get all the tipoFestaList
        restTipoFestaMockMvc.perform(get("/api/tipo-festas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoFesta.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    @Transactional
    public void getTipoFesta() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        // Get the tipoFesta
        restTipoFestaMockMvc.perform(get("/api/tipo-festas/{id}", tipoFesta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoFesta.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    public void getNonExistingTipoFesta() throws Exception {
        // Get the tipoFesta
        restTipoFestaMockMvc.perform(get("/api/tipo-festas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoFesta() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();

        // Update the tipoFesta
        TipoFesta updatedTipoFesta = tipoFestaRepository.findById(tipoFesta.getId()).get();
        // Disconnect from session so that the updates on updatedTipoFesta are not directly saved in db
        em.detach(updatedTipoFesta);
        updatedTipoFesta
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO);
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(updatedTipoFesta);

        restTipoFestaMockMvc.perform(put("/api/tipo-festas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
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
    public void updateNonExistingTipoFesta() throws Exception {
        int databaseSizeBeforeUpdate = tipoFestaRepository.findAll().size();

        // Create the TipoFesta
        TipoFestaDTO tipoFestaDTO = tipoFestaMapper.toDto(tipoFesta);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoFestaMockMvc.perform(put("/api/tipo-festas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoFestaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoFesta in the database
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoFesta() throws Exception {
        // Initialize the database
        tipoFestaRepository.saveAndFlush(tipoFesta);

        int databaseSizeBeforeDelete = tipoFestaRepository.findAll().size();

        // Delete the tipoFesta
        restTipoFestaMockMvc.perform(delete("/api/tipo-festas/{id}", tipoFesta.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoFesta> tipoFestaList = tipoFestaRepository.findAll();
        assertThat(tipoFestaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
