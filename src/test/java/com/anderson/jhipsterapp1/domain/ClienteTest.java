package com.anderson.jhipsterapp1.domain;

import static com.anderson.jhipsterapp1.domain.ClienteTestSamples.*;
import static com.anderson.jhipsterapp1.domain.FestaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.anderson.jhipsterapp1.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ClienteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cliente.class);
        Cliente cliente1 = getClienteSample1();
        Cliente cliente2 = new Cliente();
        assertThat(cliente1).isNotEqualTo(cliente2);

        cliente2.setId(cliente1.getId());
        assertThat(cliente1).isEqualTo(cliente2);

        cliente2 = getClienteSample2();
        assertThat(cliente1).isNotEqualTo(cliente2);
    }

    @Test
    void festaTest() {
        Cliente cliente = getClienteRandomSampleGenerator();
        Festa festaBack = getFestaRandomSampleGenerator();

        cliente.addFesta(festaBack);
        assertThat(cliente.getFestas()).containsOnly(festaBack);
        assertThat(festaBack.getCliente()).isEqualTo(cliente);

        cliente.removeFesta(festaBack);
        assertThat(cliente.getFestas()).doesNotContain(festaBack);
        assertThat(festaBack.getCliente()).isNull();

        cliente.festas(new HashSet<>(Set.of(festaBack)));
        assertThat(cliente.getFestas()).containsOnly(festaBack);
        assertThat(festaBack.getCliente()).isEqualTo(cliente);

        cliente.setFestas(new HashSet<>());
        assertThat(cliente.getFestas()).doesNotContain(festaBack);
        assertThat(festaBack.getCliente()).isNull();
    }
}
