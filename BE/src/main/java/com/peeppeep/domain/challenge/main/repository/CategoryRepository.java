package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
