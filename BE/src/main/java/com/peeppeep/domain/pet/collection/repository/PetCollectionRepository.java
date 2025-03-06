package com.peeppeep.domain.pet.collection.repository;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetCollectionRepository extends JpaRepository<PetCollection, Integer> {

    @Query("SELECT p FROM PetCollection p WHERE p.petCollectionId = :petCollectionId")
    Optional<PetCollection> petTypeId(@Param("petCollectionId") int petCollectionId);

}
