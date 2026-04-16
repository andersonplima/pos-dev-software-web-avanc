package com.anderson.jhipsterapp1.domain;

import static com.anderson.jhipsterapp1.domain.ClienteTestSamples.*;
import static com.anderson.jhipsterapp1.domain.FestaTestSamples.*;
import static com.anderson.jhipsterapp1.domain.TipoFestaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.anderson.jhipsterapp1.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FestaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Festa.class);
        Festa festa1 = getFestaSample1();
        Festa festa2 = new Festa();
        assertThat(festa1).isNotEqualTo(festa2);

        festa2.setId(festa1.getId());
        assertThat(festa1).isEqualTo(festa2);

        festa2 = getFestaSample2();
        assertThat(festa1).isNotEqualTo(festa2);
    }

    @Test
    void tipoFestaTest() {
        Festa festa = getFestaRandomSampleGenerator();
        TipoFesta tipoFestaBack = getTipoFestaRandomSampleGenerator();

        festa.setTipoFesta(tipoFestaBack);
        assertThat(festa.getTipoFesta()).isEqualTo(tipoFestaBack);

        festa.tipoFesta(null);
        assertThat(festa.getTipoFesta()).isNull();
    }

    @Test
    void clienteTest() {
        Festa festa = getFestaRandomSampleGenerator();
        Cliente clienteBack = getClienteRandomSampleGenerator();

        festa.setCliente(clienteBack);
        assertThat(festa.getCliente()).isEqualTo(clienteBack);

        festa.cliente(null);
        assertThat(festa.getCliente()).isNull();
    }
}
