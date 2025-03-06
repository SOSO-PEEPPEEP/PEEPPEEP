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
    private String name;

    private PetRankType petRank;

    private String content;

    private String petType;

    @Builder
    private PetCollectionDTO(String name, PetRankType petRank, String content,
                             PetType petType) {
        this.name = name;
        this.petRank = petRank;
        this.content = content;
        this.petType = petType.getName();
    }

    public static PetCollectionDTO of(PetCollection petCollection) {
        return builder()
                .name(petCollection.getName())
                .petRank(petCollection.getPetRank())
                .content(petCollection.getContent())
                .petType(petCollection.getPetType())
                .build();
    }
}
