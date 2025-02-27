package com.peeppeep.domain.challenge.main.dto;

import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import com.peeppeep.domain.challenge.main.entity.RoleType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ParticipantDTO {

    private Integer userId;

    private String profilePicture;

    private RoleType role;

    @Builder
    private ParticipantDTO(Integer userId, String profilePicture, RoleType role) {
        this.userId = userId;
        this.profilePicture = profilePicture;
        this.role = role;
    }

    public static ParticipantDTO of(ChallengeUser challengeUser) {
        return builder()
                .userId(challengeUser.getUser().getUserId())
                .profilePicture(challengeUser.getUser().getProfilePicture())
                .role(challengeUser.getRole())
                .build();
    }
}
