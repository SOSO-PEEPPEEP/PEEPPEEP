package com.peeppeep.domain.pet.luckydraw.dto;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetRankType;
import com.peeppeep.domain.pet.collection.entity.PetType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PetLuckyDrawDTO {
    private Integer petCollectionId;

    private String name;

    private PetRankType petRank;

    private String content;

    private String EggImage;

    private String petType;

    @Builder
    private PetLuckyDrawDTO(Integer petCollectionId, String name, PetRankType petRank, String content, String EggImage,
                                         PetType petType) {
        this.petCollectionId = petCollectionId;
        this.name = name;
        this.petRank = petRank;
        this.content = content;
        this.EggImage = EggImage;
        this.petType = petType.getName();
    }

    public static PetLuckyDrawDTO of(PetCollection petCollection) {
        return builder()
                .petCollectionId(petCollection.getPetCollectionId())
                .name(petCollection.getName())
                .petRank(petCollection.getPetRank())
                .content(petCollection.getContent())
                .EggImage(petCollection.getEggImage())
                .petType(petCollection.getPetType())
                .build();
    }
}
