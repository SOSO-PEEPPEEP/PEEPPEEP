package com.peeppeep.domain.challenge.main.dto.response;

import com.peeppeep.domain.challenge.main.dto.ChallengeResultItemDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeResultResponseDTO {
    private List<ChallengeResultItemDTO> items;
    private Boolean success;

    @Builder
    private ChallengeResultResponseDTO(List<ChallengeResultItemDTO> items, Boolean success) {
        this.items = items;
        this.success = success;
    }

    public static ChallengeResultResponseDTO of(List<ChallengeResultItemDTO> items, Boolean success) {
        return builder()
                .items(items)
                .success(success)
                .build();
    }
}
