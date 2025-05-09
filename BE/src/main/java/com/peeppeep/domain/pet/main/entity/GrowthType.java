package com.peeppeep.domain.pet.main.entity;

import com.peeppeep.domain.pet.collection.entity.PetCollection;

public enum GrowthType {
    EGG, // 알 상태
    BABY, // 유아 상태
    YOUTH, // 청년 상태
    ADULT; // 성년 상태

    public String selectImage(PetCollection petCollection) {
        return switch (this) {
            case EGG -> petCollection.getEggImage();
            case BABY -> petCollection.getBabyImage();
            case YOUTH -> petCollection.getYouthImage();
            case ADULT -> petCollection.getAdultImage();
            default -> throw new IllegalStateException("unknown growth: " + this);
        };
    }
}
