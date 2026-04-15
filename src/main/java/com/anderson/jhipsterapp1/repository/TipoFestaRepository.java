package com.anderson.jhipsterapp1.repository;

import com.anderson.jhipsterapp1.domain.TipoFesta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoFesta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoFestaRepository extends JpaRepository<TipoFesta, Long> {

}
