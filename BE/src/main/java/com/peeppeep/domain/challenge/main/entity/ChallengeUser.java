package com.peeppeep.domain.challenge.main.entity;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE challenge_user SET deleted_at = NOW() where user_challenge_id = ?")
public class ChallengeUser extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_challenge_id")
    private Integer userChallengeId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Builder
    private ChallengeUser(User user, Challenge challenge) {
        this.user = user;
        this.challenge = challenge;
    }

    public ChallengeUser of(User user, Challenge challenge) {
        return builder()
                .challenge(challenge)
                .user(user)
                .build();
    }
}
