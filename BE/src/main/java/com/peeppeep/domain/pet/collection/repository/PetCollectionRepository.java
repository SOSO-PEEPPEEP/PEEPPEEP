package com.peeppeep.domain.pet.collection.repository;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetType;
import com.peeppeep.domain.pet.collection.repository.projection.PetCollectionListProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetCollectionRepository extends JpaRepository<PetCollection, Integer> {
    List<PetCollection> findByPetType(PetType petType);

    @Query("SELECT p FROM PetCollection p")
    List<PetCollectionListProjection> findPetCollectionFields();
}
