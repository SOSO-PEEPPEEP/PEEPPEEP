package com.peeppeep.domain.challenge.main.dto.response;

import com.peeppeep.domain.challenge.main.entity.Challenge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeListResponseDTO {
    private String title;

    private Integer period;

    private String category;

    @Builder
    private ChallengeListResponseDTO(String title, Integer period, String category) {
        this.title = title;
        this.period = period;
        this.category = category;
    }

    public static ChallengeListResponseDTO of(Challenge challenge) {
        return builder()
                .title(challenge.getTitle())
                .period(challenge.getPeriod())
                .category(challenge.getCategory().getName())
                .build();
    }
}
