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
    Integer count;

    @Builder
    private ChallengeResultItemDTO(Integer itemId, String name, Integer count) {
        this.itemId = itemId;
        this.name = name;
        this.count = count;
    }

    public static ChallengeResultItemDTO of (Item item, Integer count) {
        return builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .count(count)
                .build();
    }
}
