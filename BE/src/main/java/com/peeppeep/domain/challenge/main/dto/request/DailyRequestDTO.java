package com.peeppeep.domain.challenge.main.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class DailyRequestDTO {
    private Integer day;

    private String content;

    private MultipartFile picture;
}
