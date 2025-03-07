package com.peeppeep.domain.pet.main.repository;

import com.peeppeep.domain.pet.main.entity.Pet;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {

    @Query("SELECT p FROM Pet p WHERE p.user = :userId AND p.petId = :petId")
    Optional<Pet> petInfo(@Param("userId") User userId, @Param("petId") int petId);
}
