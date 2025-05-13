package com.peeppeep.domain.pet.luckydraw.service;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.repository.PetCollectionRepository;
import com.peeppeep.domain.pet.luckydraw.dto.PetLuckyDrawDTO;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetLuckyDrawService {

    private final PetCollectionRepository petCollectionRepository;

    /*뽑기 결과 조회*/
    public PetLuckyDrawDTO getLuckyDraw(Integer petCollectionId) {
        // 펫 도감 정보
        PetCollection petCollection = petCollectionRepository.findById(petCollectionId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_COLLECTION_NOT_EXIST, ErrorCode.PET_COLLECTION_NOT_EXIST.getMessage()));

        return PetLuckyDrawDTO.of(petCollection);
    }
}
