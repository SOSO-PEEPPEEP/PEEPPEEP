package com.peeppeep.domain.pet.collection.repository;

import com.peeppeep.domain.pet.collection.entity.PetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetTypeRepository extends JpaRepository<PetType, Integer> {
}
