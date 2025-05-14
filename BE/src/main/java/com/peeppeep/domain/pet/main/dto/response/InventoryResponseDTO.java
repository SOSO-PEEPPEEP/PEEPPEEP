package com.peeppeep.domain.pet.main.dto.response;

import com.peeppeep.domain.pet.collection.entity.ContentType;
import com.peeppeep.domain.pet.main.entity.Inventory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InventoryResponseDTO {
    private Integer InventoryId;

    private String ItemName;

    private ContentType content;

    private Integer count;

    @Builder
    private InventoryResponseDTO(Integer InventoryId, String ItemName, ContentType content, Integer count) {
        this.InventoryId = InventoryId;
        this.ItemName = ItemName;
        this.content = content;
        this.count = count;
    }

    public static InventoryResponseDTO of(Inventory inventory) {
        return builder()
                .InventoryId(inventory.getInventoryId())
                .ItemName(inventory.getItem().getName())
                .content(inventory.getItem().getContent())
                .count(inventory.getCount())
                .build();
    }
}
