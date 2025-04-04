package com.peeppeep.domain.challenge.main.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyRequestDTO {
    private Integer day;

    private String content;

    private String picture;
}
