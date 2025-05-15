package com.peeppeep.domain.pet.main.dto.response;

import com.peeppeep.domain.pet.main.entity.GrowthType;
import com.peeppeep.domain.pet.main.entity.Pet;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PetResponseDTO {
    private Integer petId;

    private String nickname;

    private GrowthType growth;

    private Integer affection;

    private String image;

    @Builder
    private PetResponseDTO(Integer petId, String nickname, GrowthType growth, Integer affection, String image) {
        this.petId = petId;
        this.nickname = nickname;
        this.growth = growth;
        this.affection = affection;
        this.image = image;
    }

    public static PetResponseDTO of(Pet pet) {
        String image = pet.getGrowth().selectImage(pet.getPetCollection());
        return builder()
                .petId(pet.getPetId())
                .nickname(pet.getNickname())
                .growth(pet.getGrowth())
                .affection(pet.getAffection())
                .image(image)
                .build();
    }
}
