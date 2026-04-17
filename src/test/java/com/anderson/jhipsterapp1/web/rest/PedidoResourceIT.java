package com.anderson.jhipsterapp1.web.rest;

import static com.anderson.jhipsterapp1.domain.PedidoAsserts.*;
import static com.anderson.jhipsterapp1.web.rest.TestUtil.createUpdateProxyForBean;
import static com.anderson.jhipsterapp1.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.anderson.jhipsterapp1.IntegrationTest;
import com.anderson.jhipsterapp1.domain.Pedido;
import com.anderson.jhipsterapp1.repository.PedidoRepository;
import com.anderson.jhipsterapp1.service.dto.PedidoDTO;
import com.anderson.jhipsterapp1.service.mapper.PedidoMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link PedidoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PedidoResourceIT {

    private static final Instant DEFAULT_DATA_PEDIDO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_PEDIDO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_VALOR_PEDIDO = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_PEDIDO = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/pedidos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoMapper pedidoMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPedidoMockMvc;

    private Pedido pedido;

    private Pedido insertedPedido;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pedido createEntity() {
        return new Pedido().dataPedido(DEFAULT_DATA_PEDIDO).valorPedido(DEFAULT_VALOR_PEDIDO);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pedido createUpdatedEntity() {
        return new Pedido().dataPedido(UPDATED_DATA_PEDIDO).valorPedido(UPDATED_VALOR_PEDIDO);
    }

    @BeforeEach
    void initTest() {
        pedido = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedPedido != null) {
            pedidoRepository.delete(insertedPedido);
            insertedPedido = null;
        }
    }

    @Test
    @Transactional
    void createPedido() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);
        var returnedPedidoDTO = om.readValue(
            restPedidoMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pedidoDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            PedidoDTO.class
        );

        // Validate the Pedido in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedPedido = pedidoMapper.toEntity(returnedPedidoDTO);
        assertPedidoUpdatableFieldsEquals(returnedPedido, getPersistedPedido(returnedPedido));

        insertedPedido = returnedPedido;
    }

    @Test
    @Transactional
    void createPedidoWithExistingId() throws Exception {
        // Create the Pedido with an existing ID
        pedido.setId(1L);
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPedidoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValorPedidoIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        pedido.setValorPedido(null);

        // Create the Pedido, which fails.
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        restPedidoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pedidoDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPedidos() throws Exception {
        // Initialize the database
        insertedPedido = pedidoRepository.saveAndFlush(pedido);

        // Get all the pedidoList
        restPedidoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataPedido").value(hasItem(DEFAULT_DATA_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].valorPedido").value(hasItem(sameNumber(DEFAULT_VALOR_PEDIDO))));
    }

    @Test
    @Transactional
    void getPedido() throws Exception {
        // Initialize the database
        insertedPedido = pedidoRepository.saveAndFlush(pedido);

        // Get the pedido
        restPedidoMockMvc
            .perform(get(ENTITY_API_URL_ID, pedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pedido.getId().intValue()))
            .andExpect(jsonPath("$.dataPedido").value(DEFAULT_DATA_PEDIDO.toString()))
            .andExpect(jsonPath("$.valorPedido").value(sameNumber(DEFAULT_VALOR_PEDIDO)));
    }

    @Test
    @Transactional
    void getNonExistingPedido() throws Exception {
        // Get the pedido
        restPedidoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPedido() throws Exception {
        // Initialize the database
        insertedPedido = pedidoRepository.saveAndFlush(pedido);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the pedido
        Pedido updatedPedido = pedidoRepository.findById(pedido.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedPedido are not directly saved in db
        em.detach(updatedPedido);
        updatedPedido.dataPedido(UPDATED_DATA_PEDIDO).valorPedido(UPDATED_VALOR_PEDIDO);
        PedidoDTO pedidoDTO = pedidoMapper.toDto(updatedPedido);

        restPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pedidoDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pedidoDTO))
            )
            .andExpect(status().isOk());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedPedidoToMatchAllProperties(updatedPedido);
    }

    @Test
    @Transactional
    void putNonExistingPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pedido.setId(longCount.incrementAndGet());

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pedidoDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pedido.setId(longCount.incrementAndGet());

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(pedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pedido.setId(longCount.incrementAndGet());

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pedidoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePedidoWithPatch() throws Exception {
        // Initialize the database
        insertedPedido = pedidoRepository.saveAndFlush(pedido);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the pedido using partial update
        Pedido partialUpdatedPedido = new Pedido();
        partialUpdatedPedido.setId(pedido.getId());

        partialUpdatedPedido.dataPedido(UPDATED_DATA_PEDIDO);

        restPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPedido))
            )
            .andExpect(status().isOk());

        // Validate the Pedido in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPedidoUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedPedido, pedido), getPersistedPedido(pedido));
    }

    @Test
    @Transactional
    void fullUpdatePedidoWithPatch() throws Exception {
        // Initialize the database
        insertedPedido = pedidoRepository.saveAndFlush(pedido);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the pedido using partial update
        Pedido partialUpdatedPedido = new Pedido();
        partialUpdatedPedido.setId(pedido.getId());

        partialUpdatedPedido.dataPedido(UPDATED_DATA_PEDIDO).valorPedido(UPDATED_VALOR_PEDIDO);

        restPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPedido))
            )
            .andExpect(status().isOk());

        // Validate the Pedido in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPedidoUpdatableFieldsEquals(partialUpdatedPedido, getPersistedPedido(partialUpdatedPedido));
    }

    @Test
    @Transactional
    void patchNonExistingPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pedido.setId(longCount.incrementAndGet());

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pedidoDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(pedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pedido.setId(longCount.incrementAndGet());

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(pedidoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPedido() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pedido.setId(longCount.incrementAndGet());

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(pedidoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pedido in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePedido() throws Exception {
        // Initialize the database
        insertedPedido = pedidoRepository.saveAndFlush(pedido);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the pedido
        restPedidoMockMvc
            .perform(delete(ENTITY_API_URL_ID, pedido.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return pedidoRepository.count();
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

    protected Pedido getPersistedPedido(Pedido pedido) {
        return pedidoRepository.findById(pedido.getId()).orElseThrow();
    }

    protected void assertPersistedPedidoToMatchAllProperties(Pedido expectedPedido) {
        assertPedidoAllPropertiesEquals(expectedPedido, getPersistedPedido(expectedPedido));
    }

    protected void assertPersistedPedidoToMatchUpdatableProperties(Pedido expectedPedido) {
        assertPedidoAllUpdatablePropertiesEquals(expectedPedido, getPersistedPedido(expectedPedido));
    }
}
