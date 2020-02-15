package com.anderson.jhipsterapp1.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.anderson.jhipsterapp1.web.rest.TestUtil;

public class FestaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FestaDTO.class);
        FestaDTO festaDTO1 = new FestaDTO();
        festaDTO1.setId(1L);
        FestaDTO festaDTO2 = new FestaDTO();
        assertThat(festaDTO1).isNotEqualTo(festaDTO2);
        festaDTO2.setId(festaDTO1.getId());
        assertThat(festaDTO1).isEqualTo(festaDTO2);
        festaDTO2.setId(2L);
        assertThat(festaDTO1).isNotEqualTo(festaDTO2);
        festaDTO1.setId(null);
        assertThat(festaDTO1).isNotEqualTo(festaDTO2);
    }
}
