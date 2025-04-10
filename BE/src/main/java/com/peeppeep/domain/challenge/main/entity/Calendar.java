package com.peeppeep.domain.challenge.main.entity;

import com.peeppeep.global.entity.BaseBy;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import java.lang.reflect.Field;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE calendar SET deleted_at = NOW() where calendar_id = ?")
public class Calendar extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id")
    private Integer calendarId;

    // Day01~30
    /**
     * 1이상 Int : dailyId
     * 0 : 실패
     * null : 아직 수행하지 않음
     * */
    @Column(name = "day01")
    private Integer day01;
    @Column(name = "day02")
    private Integer day02;
    @Column(name = "day03")
    private Integer day03;
    @Column(name = "day04")
    private Integer day04;
    @Column(name = "day05")
    private Integer day05;
    @Column(name = "day06")
    private Integer day06;
    @Column(name = "day07")
    private Integer day07;
    @Column(name = "day08")
    private Integer day08;
    @Column(name = "day09")
    private Integer day09;
    @Column(name = "day10")
    private Integer day10;
    @Column(name = "day11")
    private Integer day11;
    @Column(name = "day12")
    private Integer day12;
    @Column(name = "day13")
    private Integer day13;
    @Column(name = "day14")
    private Integer day14;
    @Column(name = "day15")
    private Integer day15;
    @Column(name = "day16")
    private Integer day16;
    @Column(name = "day17")
    private Integer day17;
    @Column(name = "day18")
    private Integer day18;
    @Column(name = "day19")
    private Integer day19;
    @Column(name = "day20")
    private Integer day20;
    @Column(name = "day21")
    private Integer day21;
    @Column(name = "day22")
    private Integer day22;
    @Column(name = "day23")
    private Integer day23;
    @Column(name = "day24")
    private Integer day24;
    @Column(name = "day25")
    private Integer day25;
    @Column(name = "day26")
    private Integer day26;
    @Column(name = "day27")
    private Integer day27;
    @Column(name = "day28")
    private Integer day28;
    @Column(name = "day29")
    private Integer day29;
    @Column(name = "day30")
    private Integer day30;

    @OneToOne
    @JoinColumn(name = "challenge_user_id")
    private ChallengeUser challengeUser;

    @Builder
    private Calendar (ChallengeUser challengeUser) {
        this.challengeUser = challengeUser;
    }

    public static Calendar of (ChallengeUser challengeUser) {
        return builder()
                .challengeUser(challengeUser)
                .build();
    }

    public void updateDayStatus(int day, Integer dailyId) {
        try {
            String fieldName = String.format("day%02d", day);
            Field field = this.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);

            field.set(this, dailyId);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new BusinessException(ErrorCode.DAY_FIELD_NOT_EXIST, ErrorCode.DAY_FIELD_NOT_EXIST.getMessage()+" : "+day);
        }
    }

    public Integer getDay(int day) {
        try {
            String fieldName = String.format("day%02d", day);
            Field field = this.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            return (Integer) field.get(this);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new BusinessException(ErrorCode.DAY_FIELD_NOT_EXIST, ErrorCode.DAY_FIELD_NOT_EXIST.getMessage()+" : "+day);
        }
    }
}
