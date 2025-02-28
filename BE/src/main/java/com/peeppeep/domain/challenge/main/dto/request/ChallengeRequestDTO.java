package com.peeppeep.domain.challenge.main.dto.request;

import com.peeppeep.domain.challenge.main.entity.IsPublicType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ChallengeRequestDTO {
    private String title;

    private String content;

    private Integer period;

    private LocalDate startAt;

    private LocalDate endAt;

    private IsPublicType isPublic;

    private Boolean allowJoin;

    private Integer category; // 카테고리 id

    private List<Integer> participants; // 생성자 제외 참여자 user_id 리스트
}
