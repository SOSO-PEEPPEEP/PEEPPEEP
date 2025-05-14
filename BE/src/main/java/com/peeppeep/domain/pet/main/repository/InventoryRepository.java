package com.peeppeep.domain.pet.main.repository;

import com.peeppeep.domain.pet.main.entity.Inventory;
import com.peeppeep.domain.pet.main.entity.Item;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Optional<Inventory> findByUserAndItemAndDeletedAtIsNull(User user, Item item);

    List<Inventory> findByUserAndDeletedAtIsNull(User user);
}
