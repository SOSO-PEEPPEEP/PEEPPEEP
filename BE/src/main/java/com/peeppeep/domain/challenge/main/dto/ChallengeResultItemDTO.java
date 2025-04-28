package com.peeppeep.domain.challenge.main.dto;

import com.peeppeep.domain.pet.main.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeResultItemDTO {
    Integer itemId;
    String name;
    Integer number;

    @Builder
    private ChallengeResultItemDTO(Integer itemId, String name, Integer number) {
        this.itemId = itemId;
        this.name = name;
        this.number = number;
    }

    public static ChallengeResultItemDTO of (Item item, Integer number) {
        return builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .number(number)
                .build();
    }
}
