package com.peeppeep.domain.pet.main.dto;

import com.peeppeep.domain.pet.collection.dto.PetCollectionDTO;
import com.peeppeep.domain.pet.main.entity.GrowthType;
import com.peeppeep.domain.pet.main.entity.Pet;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PetDTO {
    private String nickname;

    private GrowthType growth;

    private Integer affection;

    private PetCollectionDTO petCollection;

    @Builder
    private PetDTO(String nickname, GrowthType growth, Integer affection,
                   PetCollectionDTO petCollection) {
        this.nickname = nickname;
        this.growth = growth;
        this.affection = affection;
        this.petCollection = petCollection;
    }

    public static PetDTO of(Pet pet) {
        return builder()
                .nickname(pet.getNickname())
                .growth(pet.getGrowth())
                .affection(pet.getAffection())
                .petCollection(PetCollectionDTO.of(pet.getPetCollection()))
                .build();
    }
}
