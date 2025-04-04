package com.peeppeep.domain.challenge.main.entity;

import com.peeppeep.domain.challenge.main.dto.request.DailyRequestDTO;
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
@SQLDelete(sql = "UPDATE daily SET deleted_at = NOW() where daily_id = ?")
public class Daily extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_id")
    private Integer dailyId;

    @Column(name = "day")
    private Integer day;

    @Column(name = "content")
    private String content;

    @Column(name = "picture")
    private String picture;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Builder
    private Daily(Integer day, String content, String picture,
                  Challenge challenge) {
        this.day = day;
        this.content = content;
        this.picture = picture;
        this.challenge = challenge;
    }

    public static Daily of(Challenge challenge, DailyRequestDTO dailyRequestDTO) {
        return builder()
                .day(dailyRequestDTO.getDay())
                .content(dailyRequestDTO.getContent())
                .picture(dailyRequestDTO.getPicture())
                .challenge(challenge)
                .build();
    }
}
