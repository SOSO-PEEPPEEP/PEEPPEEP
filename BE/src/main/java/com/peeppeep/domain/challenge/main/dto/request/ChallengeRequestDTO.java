package com.peeppeep.domain.challenge.main.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeppeep.domain.challenge.main.entity.IsPublic;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class ChallengeRequestDTO {
    private String title;

    private String content;

    private Integer period;

    private LocalDate startAt;

    private LocalDate endAt;

    private IsPublic isPublic;

    private Boolean allowJoin;
}
