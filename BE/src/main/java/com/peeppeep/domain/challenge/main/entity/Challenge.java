package com.peeppeep.domain.challenge.main.entity;

import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import java.time.LocalDate;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE challenge SET deleted_at = NOW() where challenge_id = ?")
public class Challenge extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_id")
    private Integer challengeId;

    @Column(name = "title", length = 25)
    private String title;

    @Column(name = "content", length = 300)
    private String content;

    @Column(name = "period")
    private Integer period;

    @Column(name = "start_at")
    private LocalDate startAt;

    @Column(name = "end_at")
    private LocalDate endAt;

    @Column(name = "is_public")
    @Enumerated(EnumType.STRING)
    private IsPublicType isPublic;

    @Column(name = "allow_join")
    private Boolean allowJoin;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChallengeUser> challengeUsers;

    @Builder
    private Challenge(String title, String content, Integer period,
                      LocalDate startAt, LocalDate endAt,
                      IsPublicType isPublic, Boolean allowJoin,
                      Category category) {
        this.title = title;
        this.content = content;
        this.period = period;
        this.startAt = startAt;
        this.endAt = endAt;
        this.isPublic = isPublic;
        this.allowJoin = allowJoin;
        this.category = category;
    }

    // 챌린지 생성
    public static Challenge of(ChallengeRequestDTO challengeRequestDTO, Category category) {
        return builder()
                .title(challengeRequestDTO.getTitle())
                .content(challengeRequestDTO.getContent())
                .period(challengeRequestDTO.getPeriod())
                .startAt(challengeRequestDTO.getStartAt())
                .endAt(challengeRequestDTO.getEndAt())
                .isPublic(challengeRequestDTO.getIsPublic())
                .allowJoin(challengeRequestDTO.getAllowJoin())
                .category(category)
                .build();
    }

    public void updateChallenge(ChallengeRequestDTO challengeRequestDTO, Category category) {
        if (challengeRequestDTO.getTitle() != null) this.title = challengeRequestDTO.getTitle();
        if (challengeRequestDTO.getContent() != null) this.content = challengeRequestDTO.getContent();
        if (challengeRequestDTO.getIsPublic() != null) this.isPublic = challengeRequestDTO.getIsPublic();
        if (challengeRequestDTO.getAllowJoin() != null) this.allowJoin = challengeRequestDTO.getAllowJoin();
        if (category != null) this.category = category;
    }
}