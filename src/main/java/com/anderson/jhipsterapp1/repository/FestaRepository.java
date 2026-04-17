package com.anderson.jhipsterapp1.repository;

import com.anderson.jhipsterapp1.domain.Festa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Festa entity.
 */
@Repository
public interface FestaRepository extends JpaRepository<Festa, Long> {
    default Optional<Festa> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Festa> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Festa> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select festa from Festa festa left join fetch festa.tipoFesta left join fetch festa.cliente",
        countQuery = "select count(festa) from Festa festa"
    )
    Page<Festa> findAllWithToOneRelationships(Pageable pageable);

    @Query("select festa from Festa festa left join fetch festa.tipoFesta left join fetch festa.cliente")
    List<Festa> findAllWithToOneRelationships();

    @Query("select festa from Festa festa left join fetch festa.tipoFesta left join fetch festa.cliente where festa.id =:id")
    Optional<Festa> findOneWithToOneRelationships(@Param("id") Long id);
}
