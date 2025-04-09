package com.peeppeep.global.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity
public class SystemJobLog {

    @Id
    private String jobName;

    private LocalDate lastRunDate;

    public static SystemJobLog of(String jobName, LocalDate lastRunDate) {
        SystemJobLog log = new SystemJobLog();
        log.jobName = jobName;
        log.lastRunDate = lastRunDate;
        return log;
    }

    public void updateDate(LocalDate date) {
        this.lastRunDate = date;
    }
}