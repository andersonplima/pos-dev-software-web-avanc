package com.anderson.jhipsterapp1.repository;

import com.anderson.jhipsterapp1.domain.Festa;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Festa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FestaRepository extends JpaRepository<Festa, Long> {

}
