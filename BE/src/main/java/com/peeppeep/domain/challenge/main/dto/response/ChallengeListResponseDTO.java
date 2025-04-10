package com.peeppeep.domain.challenge.main.dto.response;

import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeListResponseDTO {
    private Integer challengeUserId;

    private String title;

    private Integer period;

    private String category;

    private Boolean isBookmark;

    @Builder
    private ChallengeListResponseDTO(Integer challengeUserId, String title, Integer period, String category, Boolean isBookmark) {
        this.challengeUserId = challengeUserId;
        this.title = title;
        this.period = period;
        this.category = category;
        this.isBookmark = isBookmark;
    }

    public static ChallengeListResponseDTO of(ChallengeUser challengeuser) {
        Challenge challenge = challengeuser.getChallenge();
        return builder()
                .challengeUserId(challengeuser.getChallengeUserId())
                .title(challenge.getTitle())
                .period(challenge.getPeriod())
                .category(challenge.getCategory().getName())
                .isBookmark(challengeuser.getIsBookmark())
                .build();
    }
}
