package com.anderson.jhipsterapp1.domain;

import static com.anderson.jhipsterapp1.domain.FestaTestSamples.*;
import static com.anderson.jhipsterapp1.domain.TipoFestaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.anderson.jhipsterapp1.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TipoFestaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoFesta.class);
        TipoFesta tipoFesta1 = getTipoFestaSample1();
        TipoFesta tipoFesta2 = new TipoFesta();
        assertThat(tipoFesta1).isNotEqualTo(tipoFesta2);

        tipoFesta2.setId(tipoFesta1.getId());
        assertThat(tipoFesta1).isEqualTo(tipoFesta2);

        tipoFesta2 = getTipoFestaSample2();
        assertThat(tipoFesta1).isNotEqualTo(tipoFesta2);
    }

    @Test
    void festaTest() {
        TipoFesta tipoFesta = getTipoFestaRandomSampleGenerator();
        Festa festaBack = getFestaRandomSampleGenerator();

        tipoFesta.addFesta(festaBack);
        assertThat(tipoFesta.getFestas()).containsOnly(festaBack);
        assertThat(festaBack.getTipoFesta()).isEqualTo(tipoFesta);

        tipoFesta.removeFesta(festaBack);
        assertThat(tipoFesta.getFestas()).doesNotContain(festaBack);
        assertThat(festaBack.getTipoFesta()).isNull();

        tipoFesta.festas(new HashSet<>(Set.of(festaBack)));
        assertThat(tipoFesta.getFestas()).containsOnly(festaBack);
        assertThat(festaBack.getTipoFesta()).isEqualTo(tipoFesta);

        tipoFesta.setFestas(new HashSet<>());
        assertThat(tipoFesta.getFestas()).doesNotContain(festaBack);
        assertThat(festaBack.getTipoFesta()).isNull();
    }
}
