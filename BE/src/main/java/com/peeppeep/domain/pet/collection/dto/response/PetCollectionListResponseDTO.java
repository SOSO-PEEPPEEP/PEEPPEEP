package com.peeppeep.domain.pet.collection.dto.response;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetRankType;
import com.peeppeep.domain.pet.collection.entity.PetType;
import com.peeppeep.domain.pet.collection.repository.projection.PetCollectionListProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PetCollectionListResponseDTO {
    private Integer petCollectionId;

    private String name;

    private PetRankType petRank;

    private String adultImage;

    private String petType;

    @Builder
    private PetCollectionListResponseDTO(Integer petCollectionId, String name, PetRankType petRank, String adultImage,
                                         PetType petType) {
        this.petCollectionId = petCollectionId;
        this.name = name;
        this.petRank = petRank;
        this.adultImage=adultImage;
        this.petType=petType.getName();
    }

    public static PetCollectionListResponseDTO of(PetCollection petCollection) {
        return builder()
                .petCollectionId(petCollection.getPetCollectionId())
                .name(petCollection.getName())
                .petRank(petCollection.getPetRank())
                .adultImage(petCollection.getAdultImage())
                .petType(petCollection.getPetType())
                .build();
    }

    public static PetCollectionListResponseDTO of(PetCollectionListProjection projection) {
        return builder()
                .petCollectionId(projection.getPetCollectionId())
                .name(projection.getName())
                .petRank(projection.getPetRank())
                .adultImage(projection.getAdultImage())
                .petType(projection.getPetType())
                .build();
    }
}
