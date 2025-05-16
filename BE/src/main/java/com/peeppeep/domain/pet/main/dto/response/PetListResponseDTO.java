package com.peeppeep.domain.pet.main.dto.response;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetRankType;
import com.peeppeep.domain.pet.main.entity.GrowthType;
import com.peeppeep.domain.pet.main.entity.Pet;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PetListResponseDTO {
    private Integer petId;

    private String nickname;

    private GrowthType growth;

    private Integer affection;

    private String petType;

    private PetRankType petRank;

    private String image;

    private Boolean isFavorite;

    @Builder
    private PetListResponseDTO(Integer petId, String nickname, GrowthType growth, Integer affection,
                               String petType, PetRankType petRank, String image, Boolean isFavorite) {
        this.petId = petId;
        this.nickname = nickname;
        this.growth = growth;
        this.affection = affection;
        this.petType = petType;
        this.petRank = petRank;
        this.image = image;
        this.isFavorite = isFavorite;
    }

    public static PetListResponseDTO of(Pet pet, int affectionMax) {
        PetCollection petCollection = pet.getPetCollection();
        return builder()
                .petId(pet.getPetId())
                .nickname(pet.getNickname())
                .growth(pet.getGrowth())
                // % 형태로 반환
                .affection(pet.getAffection()*100/affectionMax)
                .petType(petCollection.getPetType().getName())
                .petRank(petCollection.getPetRank())
                .image(petCollection.getImageByGrowth(pet.getGrowth()))
                .isFavorite(pet.getIsFavorite())
                .build();
    }
}
