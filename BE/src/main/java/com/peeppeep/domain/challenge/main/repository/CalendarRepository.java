package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.Calendar;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    Optional<Calendar> findByChallengeUserAndDeletedAtIsNull(ChallengeUser challengeUser);
}
