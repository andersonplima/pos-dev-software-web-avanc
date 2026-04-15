package com.anderson.jhipsterapp1.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.anderson.jhipsterapp1.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class TipoFestaDTOTest {

  @Test
  public void dtoEqualsVerifier() throws Exception {
    TestUtil.equalsVerifier(TipoFestaDTO.class);
    TipoFestaDTO tipoFestaDTO1 = new TipoFestaDTO();
    tipoFestaDTO1.setId(1L);
    TipoFestaDTO tipoFestaDTO2 = new TipoFestaDTO();
    assertThat(tipoFestaDTO1).isNotEqualTo(tipoFestaDTO2);
    tipoFestaDTO2.setId(tipoFestaDTO1.getId());
    assertThat(tipoFestaDTO1).isEqualTo(tipoFestaDTO2);
    tipoFestaDTO2.setId(2L);
    assertThat(tipoFestaDTO1).isNotEqualTo(tipoFestaDTO2);
    tipoFestaDTO1.setId(null);
    assertThat(tipoFestaDTO1).isNotEqualTo(tipoFestaDTO2);
  }
}
