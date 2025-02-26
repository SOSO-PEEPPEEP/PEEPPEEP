package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeUserRepository extends JpaRepository<ChallengeUser, Integer> {

    @Query("SELECT cu.challenge FROM ChallengeUser cu WHERE cu.user = :user AND cu.deletedAt IS NULL")
    List<Challenge> findChallengesByUserAndDeletedAtIsNull(@Param("user") User user);
}
