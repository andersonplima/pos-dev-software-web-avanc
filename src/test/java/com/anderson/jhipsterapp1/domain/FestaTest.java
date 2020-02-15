package com.anderson.jhipsterapp1.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.anderson.jhipsterapp1.web.rest.TestUtil;

public class FestaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Festa.class);
        Festa festa1 = new Festa();
        festa1.setId(1L);
        Festa festa2 = new Festa();
        festa2.setId(festa1.getId());
        assertThat(festa1).isEqualTo(festa2);
        festa2.setId(2L);
        assertThat(festa1).isNotEqualTo(festa2);
        festa1.setId(null);
        assertThat(festa1).isNotEqualTo(festa2);
    }
}
