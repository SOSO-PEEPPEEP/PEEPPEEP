package com.peeppeep.domain.pet.main.dto.response;

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
public class PetListResponseDTO {
    private Integer petId;

    private String nickname;

    private GrowthType growth;

    private PetCollectionDTO petCollection;

    @Builder
    private PetListResponseDTO(Integer petId, String nickname, GrowthType growth,
                              PetCollectionDTO petCollection) {
        this.petId = petId;
        this.nickname = nickname;
        this.growth = growth;
        this.petCollection = petCollection;
    }

    public static PetListResponseDTO of(Pet pet) {
        return builder()
                .petId(pet.getPetId())
                .nickname(pet.getNickname())
                .growth(pet.getGrowth())
                .petCollection(PetCollectionDTO.of(pet.getPetCollection()))
                .build();
    }
}
