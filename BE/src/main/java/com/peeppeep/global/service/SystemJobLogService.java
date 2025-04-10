package com.peeppeep.global.service;

import com.peeppeep.global.entity.SystemJobLog;
import com.peeppeep.global.repository.SystemJobLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class SystemJobLogService {
    private final SystemJobLogRepository systemJobLogRepository;
    private final String CHALLENGE_JOB_NAME = "CHALLENGE_UPDATE";

    public LocalDate getChallengeLastProcessedDate() {
        return systemJobLogRepository.findById(CHALLENGE_JOB_NAME)
                .map(SystemJobLog::getLastRunDate)
                .orElse(null);
    }

    public void updateChallengeLastProcessedDate(LocalDate date) {
        SystemJobLog log = systemJobLogRepository.findById(CHALLENGE_JOB_NAME)
                .orElse(SystemJobLog.of(CHALLENGE_JOB_NAME, date));

        log.updateDate(date);
        systemJobLogRepository.save(log);
    }
}
