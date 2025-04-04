package com.peeppeep.domain.challenge.main.dto;

import com.peeppeep.domain.challenge.main.entity.Calendar;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CalendarDTO {

    private Integer day1;
    private Integer day2;
    private Integer day3;
    private Integer day4;
    private Integer day5;
    private Integer day6;
    private Integer day7;
    private Integer day8;
    private Integer day9;
    private Integer day10;
    private Integer day11;
    private Integer day12;
    private Integer day13;
    private Integer day14;
    private Integer day15;
    private Integer day16;
    private Integer day17;
    private Integer day18;
    private Integer day19;
    private Integer day20;
    private Integer day21;
    private Integer day22;
    private Integer day23;
    private Integer day24;
    private Integer day25;
    private Integer day26;
    private Integer day27;
    private Integer day28;
    private Integer day29;
    private Integer day30;

    public static CalendarDTO of(Calendar calendar) {
        return builder()
                .day1(calendar.getDay01())
                .day2(calendar.getDay02())
                .day3(calendar.getDay03())
                .day4(calendar.getDay04())
                .day5(calendar.getDay05())
                .day6(calendar.getDay06())
                .day7(calendar.getDay07())
                .day8(calendar.getDay08())
                .day9(calendar.getDay09())
                .day10(calendar.getDay10())
                .day11(calendar.getDay11())
                .day12(calendar.getDay12())
                .day13(calendar.getDay13())
                .day14(calendar.getDay14())
                .day15(calendar.getDay15())
                .day16(calendar.getDay16())
                .day17(calendar.getDay17())
                .day18(calendar.getDay18())
                .day19(calendar.getDay19())
                .day20(calendar.getDay20())
                .day21(calendar.getDay21())
                .day22(calendar.getDay22())
                .day23(calendar.getDay23())
                .day24(calendar.getDay24())
                .day25(calendar.getDay25())
                .day26(calendar.getDay26())
                .day27(calendar.getDay27())
                .day28(calendar.getDay28())
                .day29(calendar.getDay29())
                .day30(calendar.getDay30())
                .build();
    }
}
