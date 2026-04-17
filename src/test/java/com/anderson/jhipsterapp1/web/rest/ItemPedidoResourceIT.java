package com.anderson.jhipsterapp1.web.rest;

import static com.anderson.jhipsterapp1.domain.ItemPedidoAsserts.*;
import static com.anderson.jhipsterapp1.web.rest.TestUtil.createUpdateProxyForBean;
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
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
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
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2L * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ItemPedidoMapper itemPedidoMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemPedidoMockMvc;

    private ItemPedido itemPedido;

    private ItemPedido insertedItemPedido;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createEntity() {
        return new ItemPedido().nomeItem(DEFAULT_NOME_ITEM).valorItem(DEFAULT_VALOR_ITEM);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createUpdatedEntity() {
        return new ItemPedido().nomeItem(UPDATED_NOME_ITEM).valorItem(UPDATED_VALOR_ITEM);
    }

    @BeforeEach
    void initTest() {
        itemPedido = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedItemPedido != null) {
            itemPedidoRepository.delete(insertedItemPedido);
            insertedItemPedido = null;
        }
    }

    @Test
    @Transactional
    void createItemPedido() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);
        var returnedItemPedidoDTO = om.readValue(
            restItemPedidoMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemPedidoDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ItemPedidoDTO.class
        );

        // Validate the ItemPedido in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedItemPedido = itemPedidoMapper.toEntity(returnedItemPedidoDTO);
        assertItemPedidoUpdatableFieldsEquals(returnedItemPedido, getPersistedItemPedido(returnedItemPedido));

        insertedItemPedido = returnedItemPedido;
    }

    @Test
    @Transactional
    void createItemPedidoWithExistingId() throws Exception {
        // Create the ItemPedido with an existing ID
        itemPedido.setId(1L);
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPedidoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemPedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeItemIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        itemPedido.setNomeItem(null);

        // Create the ItemPedido, which fails.
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        restItemPedidoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemPedidoDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllItemPedidos() throws Exception {
        // Initialize the database
        insertedItemPedido = itemPedidoRepository.saveAndFlush(itemPedido);

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
        insertedItemPedido = itemPedidoRepository.saveAndFlush(itemPedido);

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
        insertedItemPedido = itemPedidoRepository.saveAndFlush(itemPedido);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the itemPedido
        ItemPedido updatedItemPedido = itemPedidoRepository.findById(itemPedido.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedItemPedido are not directly saved in db
        em.detach(updatedItemPedido);
        updatedItemPedido.nomeItem(UPDATED_NOME_ITEM).valorItem(UPDATED_VALOR_ITEM);
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(updatedItemPedido);

        restItemPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemPedidoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(itemPedidoDTO))
            )
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedItemPedidoToMatchAllProperties(updatedItemPedido);
    }

    @Test
    @Transactional
    void putNonExistingItemPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemPedido.setId(longCount.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemPedidoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchItemPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemPedido.setId(longCount.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamItemPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemPedido.setId(longCount.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemPedidoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateItemPedidoWithPatch() throws Exception {
        // Initialize the database
        insertedItemPedido = itemPedidoRepository.saveAndFlush(itemPedido);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the itemPedido using partial update
        ItemPedido partialUpdatedItemPedido = new ItemPedido();
        partialUpdatedItemPedido.setId(itemPedido.getId());

        partialUpdatedItemPedido.valorItem(UPDATED_VALOR_ITEM);

        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedItemPedido))
            )
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertItemPedidoUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedItemPedido, itemPedido),
            getPersistedItemPedido(itemPedido)
        );
    }

    @Test
    @Transactional
    void fullUpdateItemPedidoWithPatch() throws Exception {
        // Initialize the database
        insertedItemPedido = itemPedidoRepository.saveAndFlush(itemPedido);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the itemPedido using partial update
        ItemPedido partialUpdatedItemPedido = new ItemPedido();
        partialUpdatedItemPedido.setId(itemPedido.getId());

        partialUpdatedItemPedido.nomeItem(UPDATED_NOME_ITEM).valorItem(UPDATED_VALOR_ITEM);

        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedItemPedido))
            )
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertItemPedidoUpdatableFieldsEquals(partialUpdatedItemPedido, getPersistedItemPedido(partialUpdatedItemPedido));
    }

    @Test
    @Transactional
    void patchNonExistingItemPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemPedido.setId(longCount.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, itemPedidoDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchItemPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemPedido.setId(longCount.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(itemPedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamItemPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemPedido.setId(longCount.incrementAndGet());

        // Create the ItemPedido
        ItemPedidoDTO itemPedidoDTO = itemPedidoMapper.toDto(itemPedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(itemPedidoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemPedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteItemPedido() throws Exception {
        // Initialize the database
        insertedItemPedido = itemPedidoRepository.saveAndFlush(itemPedido);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the itemPedido
        restItemPedidoMockMvc
            .perform(delete(ENTITY_API_URL_ID, itemPedido.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return itemPedidoRepository.count();
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

    protected ItemPedido getPersistedItemPedido(ItemPedido itemPedido) {
        return itemPedidoRepository.findById(itemPedido.getId()).orElseThrow();
    }

    protected void assertPersistedItemPedidoToMatchAllProperties(ItemPedido expectedItemPedido) {
        assertItemPedidoAllPropertiesEquals(expectedItemPedido, getPersistedItemPedido(expectedItemPedido));
    }

    protected void assertPersistedItemPedidoToMatchUpdatableProperties(ItemPedido expectedItemPedido) {
        assertItemPedidoAllUpdatablePropertiesEquals(expectedItemPedido, getPersistedItemPedido(expectedItemPedido));
    }
}
