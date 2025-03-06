package com.peeppeep.domain.pet.main.repository;

import com.peeppeep.domain.pet.main.entity.Pet;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByUserAndDeletedAtIsNull(User user);

    Optional<Pet> findByPetIdAndDeletedAtIsNull(Integer petId);
}
