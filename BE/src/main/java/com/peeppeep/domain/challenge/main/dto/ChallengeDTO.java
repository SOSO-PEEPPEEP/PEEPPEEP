package com.peeppeep.domain.challenge.main.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeppeep.domain.challenge.main.entity.Challenge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeDTO {

    private String title;

    private String content;

    private Integer period;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startAt;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endAt;

    private String category;

    private CalendarDTO calendar;

    @Builder
    private ChallengeDTO(String title, String content, Integer period,
                         LocalDate startAt, LocalDate endAt,
                         String category, CalendarDTO calendar) {
        this.title = title;
        this.content = content;
        this.period = period;
        this.startAt = startAt;
        this.endAt = endAt;
        this.category = category;
        this.calendar = calendar;
    }

    public static ChallengeDTO of(Challenge challenge) {
        return builder()
                .title(challenge.getTitle())
                .content(challenge.getContent())
                .period(challenge.getPeriod())
                .startAt(challenge.getStartAt())
                .endAt(challenge.getEndAt())
                .category(challenge.getCategory().getName())
                .calendar(CalendarDTO.of(challenge.getCalendar()))
                .build();
    }
}
