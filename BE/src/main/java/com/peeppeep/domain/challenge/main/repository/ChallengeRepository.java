package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {

    @Query("SELECT c FROM Challenge c LEFT JOIN FETCH c.challengeUsers WHERE c.challengeId = :challengeId AND c.deletedAt IS NULL")
    Optional<Challenge> findByChallengeIdAndDeletedAtIsNull(Integer challengeId);
}
