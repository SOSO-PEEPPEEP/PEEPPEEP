package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.Calendar;
import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
    Optional<Calendar> findByChallengeUserAndDeletedAtIsNull(ChallengeUser challengeUser);

    @Modifying
    @Query("UPDATE Calendar c SET c.deletedAt = CURRENT_TIMESTAMP WHERE c.calendarId = :calendarId")
    void softDelete(@Param("calendarId") Integer calendarId);
}
