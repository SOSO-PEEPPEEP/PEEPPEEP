package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.Daily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyRepository extends JpaRepository<Daily, Integer> {

}
