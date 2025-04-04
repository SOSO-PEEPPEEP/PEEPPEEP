package com.peeppeep.domain.pet.collection.repository;

import com.peeppeep.domain.pet.collection.entity.PetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetTypeRepository extends JpaRepository<PetType, Integer> {

    @Query("SELECT pt FROM PetType pt WHERE pt.petTypeId = :petTypeId")
    Optional<PetType> petTypeId(@Param("petTypeId") int petTypeId);
}
