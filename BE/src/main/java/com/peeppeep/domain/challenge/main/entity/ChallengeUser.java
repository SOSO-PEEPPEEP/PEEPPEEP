package com.peeppeep.domain.challenge.main.entity;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE challenge_user SET deleted_at = NOW() where challenge_user_id = ?")
public class ChallengeUser extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_user_id")
    private Integer challengeUserId;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RoleType role;

    @Column(name = "streak_count")
    private Integer streakCount;

    @Column(name = "result_score")
    private Integer resultScore;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Column(name="is_bookmark")
    private Boolean isBookmark;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @OneToOne(mappedBy = "challengeUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Calendar calendar;

    @OneToMany(mappedBy = "challengeUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Daily> dailies;

    @Builder
    private ChallengeUser(User user, Challenge challenge, RoleType role) {
        this.user = user;
        this.challenge = challenge;
        this.role = role;
        this.streakCount = 0;
        this.resultScore = 0;
        this.isCompleted = false;
        this.isBookmark = false;
        this.calendar = Calendar.of(this);
    }

    public static ChallengeUser of(User user, Challenge challenge, RoleType role) {
        return builder()
                .challenge(challenge)
                .user(user)
                .role(role)
                .build();
    }

    public void updateStreakCountAndResultScorePlus() {
        // 연속일
        streakCount++;
        // 점수
        int basePoints = 10;
        int bonusPoints = (streakCount - 1) * (streakCount - 1);
        resultScore += basePoints + bonusPoints;
    }

    public void updateStreakCountAndResultScoreMinus() {
        // 점수
        int basePoints = 10;
        int bonusPoints = (streakCount - 1) * (streakCount - 1);
        resultScore -= basePoints + bonusPoints;
        // 연속일
        streakCount--;
    }

    public void updateIsCompleted() {
        isCompleted = true;
    }

    public void resetStreak() {
        this.streakCount = 0;
    }
}
