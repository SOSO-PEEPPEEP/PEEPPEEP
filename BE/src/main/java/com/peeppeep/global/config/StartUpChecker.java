package com.peeppeep.global.config;

import com.peeppeep.domain.challenge.main.scheduler.ChallengeDailyScheduler;
import com.peeppeep.global.service.SystemJobLogService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class StartUpChecker {

    private final ChallengeDailyScheduler challengeDailyScheduler;
    private final SystemJobLogService systemJobLogService;

    @PostConstruct
    public void onServerStart() {
        LocalDate today = LocalDate.now();
        LocalDate lastProcessed = systemJobLogService.getChallengeLastProcessedDate();

        if (lastProcessed == null || lastProcessed.isBefore(today)) {
            challengeDailyScheduler.updateFailedChallenges();
            systemJobLogService.updateChallengeLastProcessedDate(today);
        }
    }
}
