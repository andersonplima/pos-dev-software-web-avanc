package com.anderson.jhipsterapp1.web.rest;

import static com.anderson.jhipsterapp1.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.anderson.jhipsterapp1.IntegrationTest;
import com.anderson.jhipsterapp1.domain.ItemPedido;
import com.anderson.jhipsterapp1.repository.ItemPedidoRepository;
import com.anderson.jhipsterapp1.service.dto.ItemPedidoDTO;
import com.anderson.jhipsterapp1.service.mapper.ItemPedidoMapper;
import java.math.BigDecimal;
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
 * Integration tests for the {@link ItemPedidoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ItemPedidoResourceIT {

    private static final String DEFAULT_NOME_ITEM = "AAAAAAAAAA";
    private static final String UPDATED_NOME_ITEM = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_VALOR_ITEM = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_ITEM = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/item-pedidos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ItemPedidoMapper itemPedidoMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemPedidoMockMvc;

    private ItemPedido itemPedido;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido().nomeItem(DEFAULT_NOME_ITEM).valorItem(DEFAULT_VALOR_ITEM);
        return itemPedido;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createUpdatedEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido().nomeItem(UPDATED_NOME_ITEM).valorItem(UPDATED_VALOR_ITEM);
        return itemPedido;
    }

    @BeforeEach
    public void initTest() {
        itemPedido = createEntity(em);
    }

    @Test
    @Transactional
    void createItemPedido() throws Exception {
        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();
        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);
        restItemPedidoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isCreated());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNomeItem()).isEqualTo(DEFAULT_NOME_ITEM);
        assertThat(testItemPedido.getValorItem()).isEqualByComparingTo(DEFAULT_VALOR_ITEM);
    }

    @Test
    @Transactional
    void createItemPedidoWithExistingId() throws Exception {
        // Create the ItemPedido with an existing ID
        itemPedido.setId(1L);
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPedidoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeItemIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemPedidoRepository.findAll().size();
        // set the field null
        itemPedido.setNomeItem(null);

        // Create the ItemPedido, which fails.
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        restItemPedidoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isBadRequest());

        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllItemPedidos() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get all the itemPedidoList
        restItemPedidoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeItem").value(hasItem(DEFAULT_NOME_ITEM)))
            .andExpect(jsonPath("$.[*].valorItem").value(hasItem(sameNumber(DEFAULT_VALOR_ITEM))));
    }

    @Test
    @Transactional
    void getItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get the itemPedido
        restItemPedidoMockMvc
            .perform(get(ENTITY_API_URL_ID, itemPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemPedido.getId().intValue()))
            .andExpect(jsonPath("$.nomeItem").value(DEFAULT_NOME_ITEM))
            .andExpect(jsonPath("$.valorItem").value(sameNumber(DEFAULT_VALOR_ITEM)));
    }

    @Test
    @Transactional
    void getNonExistingItemPedido() throws Exception {
        // Get the itemPedido
        restItemPedidoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Update the itemPedido
        ItemPedido updatedItemPedido = itemPedidoRepository.findById(itemPedido.getId()).get();
        // Disconnect from session so that the updates on updatedItemPedido are not directly saved in db
        em.detach(updatedItemPedido);
        updatedItemPedido.nomeItem(UPDATED_NOME_ITEM).valorItem(UPDATED_VALOR_ITEM);
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(updatedItemPedido);

        restItemPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemPedidoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO))
            )
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNomeItem()).isEqualTo(UPDATED_NOME_ITEM);
        assertThat(testItemPedido.getValorItem()).isEqualByComparingTo(UPDATED_VALOR_ITEM);
    }

    @Test
    @Transactional
    void putNonExistingItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();
        itemPedido.setId(count.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemPedidoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();
        itemPedido.setId(count.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();
        itemPedido.setId(count.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateItemPedidoWithPatch() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Update the itemPedido using partial update
        ItemPedido partialUpdatedItemPedido = new ItemPedido();
        partialUpdatedItemPedido.setId(itemPedido.getId());

        partialUpdatedItemPedido.valorItem(UPDATED_VALOR_ITEM);

        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemPedido))
            )
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNomeItem()).isEqualTo(DEFAULT_NOME_ITEM);
        assertThat(testItemPedido.getValorItem()).isEqualByComparingTo(UPDATED_VALOR_ITEM);
    }

    @Test
    @Transactional
    void fullUpdateItemPedidoWithPatch() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Update the itemPedido using partial update
        ItemPedido partialUpdatedItemPedido = new ItemPedido();
        partialUpdatedItemPedido.setId(itemPedido.getId());

        partialUpdatedItemPedido.nomeItem(UPDATED_NOME_ITEM).valorItem(UPDATED_VALOR_ITEM);

        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemPedido))
            )
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNomeItem()).isEqualTo(UPDATED_NOME_ITEM);
        assertThat(testItemPedido.getValorItem()).isEqualByComparingTo(UPDATED_VALOR_ITEM);
    }

    @Test
    @Transactional
    void patchNonExistingItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();
        itemPedido.setId(count.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, itemPedidoDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();
        itemPedido.setId(count.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();
        itemPedido.setId(count.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(itemPedidoDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeDelete = itemPedidoRepository.findAll().size();

        // Delete the itemPedido
        restItemPedidoMockMvc
            .perform(delete(ENTITY_API_URL_ID, itemPedido.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
