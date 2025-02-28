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
    @Column(name = "day01")
    private DailyStatusType day01 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day02")
    private DailyStatusType day02 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day03")
    private DailyStatusType day03 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day04")
    private DailyStatusType day04 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day05")
    private DailyStatusType day05 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day06")
    private DailyStatusType day06 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day07")
    private DailyStatusType day07 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day08")
    private DailyStatusType day08 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day09")
    private DailyStatusType day09 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day10")
    private DailyStatusType day10 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day11")
    private DailyStatusType day11 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day12")
    private DailyStatusType day12 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day13")
    private DailyStatusType day13 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day14")
    private DailyStatusType day14 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day15")
    private DailyStatusType day15 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day16")
    private DailyStatusType day16 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day17")
    private DailyStatusType day17 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day18")
    private DailyStatusType day18 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day19")
    private DailyStatusType day19 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day20")
    private DailyStatusType day20 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day21")
    private DailyStatusType day21 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day22")
    private DailyStatusType day22 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day23")
    private DailyStatusType day23 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day24")
    private DailyStatusType day24 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day25")
    private DailyStatusType day25 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day26")
    private DailyStatusType day26 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day27")
    private DailyStatusType day27 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day28")
    private DailyStatusType day28 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day29")
    private DailyStatusType day29 = DailyStatusType.NOT_ATTEMPTED;
    @Column(name = "day30")
    private DailyStatusType day30 = DailyStatusType.NOT_ATTEMPTED;

    @OneToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Builder
    private Calendar (Challenge challenge) {
        this.challenge = challenge;
    }

    public static Calendar of (Challenge challenge) {
        return builder()
                .challenge(challenge)
                .build();
    }

    public void updateDayStatus(int day, DailyStatusType status) {
        try {
            String fieldName = String.format("day%02d", day);
            Field field = this.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);

            field.set(this, status);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new BusinessException(ErrorCode.DAY_FIELD_NOT_EXIST, ErrorCode.DAY_FIELD_NOT_EXIST.getMessage()+" : "+day);
        }
    }
}
