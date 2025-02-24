package com.peeppeep.domain.challenge.main.entity;

import com.peeppeep.domain.challenge.main.dto.ChallengeDTO;
import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE challenge SET deleted_at = NOW() where challenge_id = ?")
public class Challenge extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_id")
    private Integer challengeId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "period")
    private Integer period;

    @Column(name = "start_at")
    private LocalDate startAt;

    @Column(name = "end_at")
    private LocalDate endAt;

    @Column(name = "is_public")
    @Enumerated(EnumType.STRING)
    private IsPublic isPublic;

    @Column(name = "allow_join")
    private Boolean allowJoin;

    @Column(name = "streak_count")
    private Integer streakCount;

    @Builder
    private Challenge(String title, String content, Integer period,
                      LocalDate startAt, LocalDate endAt,
                      IsPublic isPublic, Boolean allowJoin, Integer streakCount) {
        this.title = title;
        this.content = content;
        this.period = period;
        this.startAt = startAt;
        this.endAt = endAt;
        this.isPublic = isPublic;
        this.allowJoin = allowJoin;
        this.streakCount = streakCount;
    }

    // 챌린지 생성
    public static Challenge of(ChallengeRequestDTO challengeRequestDTO) {
        return builder()
                .title(challengeRequestDTO.getTitle())
                .content(challengeRequestDTO.getContent())
                .period(challengeRequestDTO.getPeriod())
                .startAt(challengeRequestDTO.getStartAt())
                .endAt(challengeRequestDTO.getEndAt())
                .isPublic(challengeRequestDTO.getIsPublic())
                .allowJoin(challengeRequestDTO.getAllowJoin())
                .streakCount(0)
                .build();
    }
}