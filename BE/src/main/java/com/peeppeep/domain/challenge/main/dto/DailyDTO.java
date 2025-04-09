package com.peeppeep.domain.challenge.main.dto;

import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import com.peeppeep.domain.challenge.main.entity.Daily;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DailyDTO {
    private Integer day;

    private String content;

    private String picture;

    @Builder
    private DailyDTO(Integer day, String content, String picture) {
        this.day = day;
        this.content = content;
        this.picture = picture;
    }

    public static DailyDTO of(Daily daily) {
        return builder()
                .day(daily.getDay())
                .content(daily.getContent())
                .picture(daily.getPicture())
                .build();
    }
}
