package com.peeppeep.domain.pet.main.repository;

import com.peeppeep.domain.pet.main.entity.Inventory;
import com.peeppeep.domain.pet.main.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query("SELECT i FROM Item i WHERE i.itemId = :itemId")
    Optional<Item> iteminfo(@Param("itemId") int itemId);

    @Query("SELECT i.rate FROM Item i WHERE i.itemId = :itemId")
    int inventoryCountInfo(@Param("itemId") int itemId);

}
