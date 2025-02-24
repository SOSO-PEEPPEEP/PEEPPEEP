package com.peeppeep.domain.challenge.main.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeppeep.domain.challenge.main.entity.IsPublic;
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

    private IsPublic isPublic;

    private Boolean allowJoin;

    @Builder
    private ChallengeDTO(String title, String content, Integer period,
                         LocalDate startAt, LocalDate endAt,
                         IsPublic isPublic, Boolean allowJoin) {
        this.title = title;
        this.content = content;
        this.period = period;
        this.startAt = startAt;
        this.endAt = endAt;
        this.isPublic = isPublic;
        this.allowJoin = allowJoin;
    }
}
