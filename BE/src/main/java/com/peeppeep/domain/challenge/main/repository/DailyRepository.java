package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import com.peeppeep.domain.challenge.main.entity.Daily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DailyRepository extends JpaRepository<Daily, Integer> {

    Optional<Daily> findByDailyIdAndDeletedAtIsNull(Integer dailyId);

    List<Daily> findByChallengeUserAndDeletedAtIsNull(ChallengeUser challengeUser);
}
