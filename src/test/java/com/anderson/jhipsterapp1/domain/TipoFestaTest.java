package com.anderson.jhipsterapp1.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.anderson.jhipsterapp1.web.rest.TestUtil;

public class TipoFestaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoFesta.class);
        TipoFesta tipoFesta1 = new TipoFesta();
        tipoFesta1.setId(1L);
        TipoFesta tipoFesta2 = new TipoFesta();
        tipoFesta2.setId(tipoFesta1.getId());
        assertThat(tipoFesta1).isEqualTo(tipoFesta2);
        tipoFesta2.setId(2L);
        assertThat(tipoFesta1).isNotEqualTo(tipoFesta2);
        tipoFesta1.setId(null);
        assertThat(tipoFesta1).isNotEqualTo(tipoFesta2);
    }
}
