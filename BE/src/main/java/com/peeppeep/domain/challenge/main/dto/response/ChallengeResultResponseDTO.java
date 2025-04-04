package com.peeppeep.domain.challenge.main.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeResultResponseDTO {
    //==ItemDTO List 호출 예정==//
    // 임의의 아이템 List
    private List<String> items;

    @Builder
    private ChallengeResultResponseDTO(List<String> items) {
        this.items = items;
    }

    public static ChallengeResultResponseDTO of(List<String> items) {
        return builder()
                .items(items)
                .build();
    }
}
