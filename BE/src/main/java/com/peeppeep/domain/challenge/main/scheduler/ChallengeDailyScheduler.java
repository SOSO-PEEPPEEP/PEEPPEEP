package com.peeppeep.domain.challenge.main.scheduler;

import com.peeppeep.domain.challenge.main.entity.Calendar;
import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import com.peeppeep.domain.challenge.main.repository.ChallengeUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ChallengeDailyScheduler {

    private final ChallengeUserRepository challengeUserRepository;

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void updateFailedChallenges() {
        LocalDate today = LocalDate.now();
        List<ChallengeUser> challengeUsers = challengeUserRepository.findAllByIsCompletedIsFalseAndDeletedAtIsNull();

        for (ChallengeUser challengeUser : challengeUsers) {
            Challenge challenge = challengeUser.getChallenge();
            LocalDate startAt = challenge.getStartAt();
            long dayDiff = ChronoUnit.DAYS.between(startAt, today);

            if (dayDiff < 1) continue;

            Calendar calendar = challengeUser.getCalendar();
            boolean updatedAnyDay = false;

            for (int d = 1; d <= dayDiff; d++) {
                Integer value = calendar.getDay(d);
                if (value == null) {
                    calendar.updateDayStatus(d, 0);
                    updatedAnyDay = true;
                }
            }

            if (updatedAnyDay) {
                challengeUser.resetStreak();
            }
        }
    }
}
