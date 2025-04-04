package com.peeppeep.domain.challenge.main.dto.response;

import com.peeppeep.domain.challenge.main.entity.Challenge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeListResponseDTO {
    private Integer challengeId;

    private String title;

    private Integer period;

    private String category;

    @Builder
    private ChallengeListResponseDTO(Integer challengeId, String title, Integer period, String category) {
        this.challengeId = challengeId;
        this.title = title;
        this.period = period;
        this.category = category;
    }

    public static ChallengeListResponseDTO of(Challenge challenge) {
        return builder()
                .challengeId(challenge.getChallengeId())
                .title(challenge.getTitle())
                .period(challenge.getPeriod())
                .category(challenge.getCategory().getName())
                .build();
    }
}
