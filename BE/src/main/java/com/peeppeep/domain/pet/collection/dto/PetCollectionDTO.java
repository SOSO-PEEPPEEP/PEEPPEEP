package com.peeppeep.domain.pet.collection.dto;

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
public class PetCollectionDTO {
    private Integer petCollectionId;

    private String name;

    private PetRankType petRank;

    private String content;

    private String eggImage;

    private String babyImage;

    private String youthImage;

    private String adultImage;

    private String petType;

    @Builder
    private PetCollectionDTO(Integer petCollectionId, String name, PetRankType petRank, String content,
                             String eggImage, String babyImage, String youthImage, String adultImage,
                             PetType petType) {
        this.petCollectionId = petCollectionId;
        this.name = name;
        this.petRank = petRank;
        this.content = content;
        this.eggImage = eggImage;
        this.babyImage = babyImage;
        this.youthImage = youthImage;
        this.adultImage = adultImage;
        this.petType = petType.getName();
    }

    public static PetCollectionDTO of(PetCollection petCollection) {
        return builder()
                .petCollectionId(petCollection.getPetCollectionId())
                .name(petCollection.getName())
                .petRank(petCollection.getPetRank())
                .content(petCollection.getContent())
                .petType(petCollection.getPetType())
                .eggImage(petCollection.getEggImage())
                .babyImage(petCollection.getBabyImage())
                .youthImage(petCollection.getYouthImage())
                .adultImage(petCollection.getAdultImage())
                .build();
    }
}