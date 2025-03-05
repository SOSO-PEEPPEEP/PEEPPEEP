package com.peeppeep.domain.pet.main.repository;

import com.peeppeep.domain.pet.main.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
}
