package com.peeppeep.domain.challenge.main.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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

    private Integer streakCount;

    private Boolean isBookmark;

    private Boolean isCompleted;

    private String category;

    private List<ParticipantDTO> participants;

    private CalendarDTO calendar;

    @Builder
    private ChallengeDTO(String title, String content, Integer period,
                         LocalDate startAt, LocalDate endAt,
                         Integer streakCount, Boolean isBookmark, Boolean isCompleted,
                         String category, List<ParticipantDTO> participants, CalendarDTO calendar) {
        this.title = title;
        this.content = content;
        this.period = period;
        this.startAt = startAt;
        this.endAt = endAt;
        this.streakCount = streakCount;
        this.isBookmark = isBookmark;
        this.isCompleted = isCompleted;
        this.category = category;
        this.participants = participants;
        this.calendar = calendar;
    }

    public static ChallengeDTO of(ChallengeUser challengeUser) {
        Challenge challenge = challengeUser.getChallenge();
        return builder()
                .title(challenge.getTitle())
                .content(challenge.getContent())
                .period(challenge.getPeriod())
                .startAt(challenge.getStartAt())
                .endAt(challenge.getEndAt())
                .streakCount(challengeUser.getStreakCount())
                .isBookmark(challengeUser.getIsBookmark())
                .isCompleted(challengeUser.getIsCompleted())
                .category(challenge.getCategory().getName())
                .participants(challenge.getChallengeUsers().stream()
                        .filter(cu -> cu.getDeletedAt() == null)
                        .map(ParticipantDTO::of)
                        .collect(Collectors.toList()))
                .calendar(CalendarDTO.of(challengeUser.getCalendar()))
                .build();
    }
}
