package com.peeppeep.domain.challenge.main.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeppeep.domain.challenge.main.entity.Daily;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class DailyDTO {
    private Integer day;

    private String content;

    private String picture;

    private Integer challengeUserId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;

    @Builder
    private DailyDTO(Integer day, String content, String picture,
                     Integer challengeUserId, LocalDateTime createdAt) {
        this.day = day;
        this.content = content;
        this.picture = picture;
        this.challengeUserId = challengeUserId;
        this.createdAt = createdAt;
    }

    public static DailyDTO of(Daily daily) {
        return builder()
                .day(daily.getDay())
                .content(daily.getContent())
                .picture(daily.getPicture())
                .challengeUserId(daily.getChallengeUser().getChallengeUserId())
                .createdAt(daily.getCreatedAt())
                .build();
    }
}
