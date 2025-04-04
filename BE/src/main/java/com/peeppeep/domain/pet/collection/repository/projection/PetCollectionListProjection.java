package com.peeppeep.domain.pet.collection.repository.projection;

import com.peeppeep.domain.pet.collection.entity.PetRankType;
import com.peeppeep.domain.pet.collection.entity.PetType;

public interface PetCollectionListProjection {
    Integer getPetCollectionId();
    String getName();
    PetRankType getPetRank();
    String getAdultImage();
    PetType getPetType();
}
