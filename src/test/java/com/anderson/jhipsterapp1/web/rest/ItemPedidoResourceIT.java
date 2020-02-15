package com.anderson.jhipsterapp1.web.rest;

import com.anderson.jhipsterapp1.Jhipsterapp1App;
import com.anderson.jhipsterapp1.domain.ItemPedido;
import com.anderson.jhipsterapp1.repository.ItemPedidoRepository;
import com.anderson.jhipsterapp1.service.ItemPedidoService;
import com.anderson.jhipsterapp1.service.dto.ItemPedidoDTO;
import com.anderson.jhipsterapp1.service.mapper.ItemPedidoMapper;
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
import java.math.BigDecimal;
import java.util.List;

import static com.anderson.jhipsterapp1.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemPedidoResource} REST controller.
 */
@SpringBootTest(classes = Jhipsterapp1App.class)
public class ItemPedidoResourceIT {

    private static final String DEFAULT_NOME_ITEM = "AAAAAAAAAA";
    private static final String UPDATED_NOME_ITEM = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_VALOR_ITEM = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_ITEM = new BigDecimal(2);

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ItemPedidoMapper itemPedidoMapper;

    @Autowired
    private ItemPedidoService itemPedidoService;

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

    private MockMvc restItemPedidoMockMvc;

    private ItemPedido itemPedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemPedidoResource itemPedidoResource = new ItemPedidoResource(itemPedidoService);
        this.restItemPedidoMockMvc = MockMvcBuilders.standaloneSetup(itemPedidoResource)
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
    public static ItemPedido createEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido()
            .nomeItem(DEFAULT_NOME_ITEM)
            .valorItem(DEFAULT_VALOR_ITEM);
        return itemPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createUpdatedEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido()
            .nomeItem(UPDATED_NOME_ITEM)
            .valorItem(UPDATED_VALOR_ITEM);
        return itemPedido;
    }

    @BeforeEach
    public void initTest() {
        itemPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemPedido() throws Exception {
        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);
        restItemPedidoMockMvc.perform(post("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isCreated());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNomeItem()).isEqualTo(DEFAULT_NOME_ITEM);
        assertThat(testItemPedido.getValorItem()).isEqualTo(DEFAULT_VALOR_ITEM);
    }

    @Test
    @Transactional
    public void createItemPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido with an existing ID
        itemPedido.setId(1L);
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPedidoMockMvc.perform(post("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeItemIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemPedidoRepository.findAll().size();
        // set the field null
        itemPedido.setNomeItem(null);

        // Create the ItemPedido, which fails.
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        restItemPedidoMockMvc.perform(post("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isBadRequest());

        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemPedidos() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get all the itemPedidoList
        restItemPedidoMockMvc.perform(get("/api/item-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeItem").value(hasItem(DEFAULT_NOME_ITEM)))
            .andExpect(jsonPath("$.[*].valorItem").value(hasItem(DEFAULT_VALOR_ITEM.intValue())));
    }
    
    @Test
    @Transactional
    public void getItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get the itemPedido
        restItemPedidoMockMvc.perform(get("/api/item-pedidos/{id}", itemPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemPedido.getId().intValue()))
            .andExpect(jsonPath("$.nomeItem").value(DEFAULT_NOME_ITEM))
            .andExpect(jsonPath("$.valorItem").value(DEFAULT_VALOR_ITEM.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingItemPedido() throws Exception {
        // Get the itemPedido
        restItemPedidoMockMvc.perform(get("/api/item-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Update the itemPedido
        ItemPedido updatedItemPedido = itemPedidoRepository.findById(itemPedido.getId()).get();
        // Disconnect from session so that the updates on updatedItemPedido are not directly saved in db
        em.detach(updatedItemPedido);
        updatedItemPedido
            .nomeItem(UPDATED_NOME_ITEM)
            .valorItem(UPDATED_VALOR_ITEM);
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(updatedItemPedido);

        restItemPedidoMockMvc.perform(put("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNomeItem()).isEqualTo(UPDATED_NOME_ITEM);
        assertThat(testItemPedido.getValorItem()).isEqualTo(UPDATED_VALOR_ITEM);
    }

    @Test
    @Transactional
    public void updateNonExistingItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc.perform(put("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeDelete = itemPedidoRepository.findAll().size();

        // Delete the itemPedido
        restItemPedidoMockMvc.perform(delete("/api/item-pedidos/{id}", itemPedido.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
