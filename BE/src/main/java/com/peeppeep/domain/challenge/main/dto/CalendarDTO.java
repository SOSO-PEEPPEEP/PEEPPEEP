package com.peeppeep.domain.challenge.main.dto;

import com.peeppeep.domain.challenge.main.entity.Calendar;
import com.peeppeep.domain.challenge.main.entity.DailyStatusType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CalendarDTO {

    private DailyStatusType day1;
    private DailyStatusType day2;
    private DailyStatusType day3;
    private DailyStatusType day4;
    private DailyStatusType day5;
    private DailyStatusType day6;
    private DailyStatusType day7;
    private DailyStatusType day8;
    private DailyStatusType day9;
    private DailyStatusType day10;
    private DailyStatusType day11;
    private DailyStatusType day12;
    private DailyStatusType day13;
    private DailyStatusType day14;
    private DailyStatusType day15;
    private DailyStatusType day16;
    private DailyStatusType day17;
    private DailyStatusType day18;
    private DailyStatusType day19;
    private DailyStatusType day20;
    private DailyStatusType day21;
    private DailyStatusType day22;
    private DailyStatusType day23;
    private DailyStatusType day24;
    private DailyStatusType day25;
    private DailyStatusType day26;
    private DailyStatusType day27;
    private DailyStatusType day28;
    private DailyStatusType day29;
    private DailyStatusType day30;

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
