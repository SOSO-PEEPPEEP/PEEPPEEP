package com.peeppeep.domain.pet.collection.service;

import com.peeppeep.domain.pet.collection.dto.PetCollectionDTO;
import com.peeppeep.domain.pet.collection.dto.response.PetCollectionListResponseDTO;
import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.repository.projection.PetCollectionListProjection;
import com.peeppeep.domain.pet.collection.repository.PetCollectionRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetCollectionService {

    private final PetCollectionRepository petCollectionRepository;

    /*도감 목록 조회*/
    public List<PetCollectionListResponseDTO> getPetCollections() {
        // 펫 도감 목록 조회
        List<PetCollectionListProjection> petCollections = petCollectionRepository.findPetCollectionFields();

        return petCollections.stream()
                .map(PetCollectionListResponseDTO::of)
                .collect(Collectors.toList());
    }

    /*도감 상세 조회*/
    public PetCollectionDTO getPetCollectionDetail(Integer petCollectionId) {
        // 펫 도감 정보
        PetCollection petCollection = petCollectionRepository.findById(petCollectionId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_COLLECTION_NOT_FOUND, ErrorCode.PET_COLLECTION_NOT_FOUND.getMessage()));

        return PetCollectionDTO.of(petCollection);
    }
}
