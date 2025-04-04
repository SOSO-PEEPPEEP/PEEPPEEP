package com.peeppeep.domain.pet.collection.controller;

import com.peeppeep.domain.pet.collection.dto.PetCollectionDTO;
import com.peeppeep.domain.pet.collection.dto.response.PetCollectionListResponseDTO;
import com.peeppeep.domain.pet.collection.service.PetCollectionService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetCollectionController {

    private final PetCollectionService petCollectionService;

    @GetMapping("/collections")
    public ApiResponse<List<PetCollectionListResponseDTO>> getPetCollections() {
        return ApiResponse.of(SuccessCode.PET_COLLECTION_GET_SUCCESS, petCollectionService.getPetCollections());
    }

    @GetMapping("/collections/{pet-collection-id}")
    public ApiResponse<PetCollectionDTO> getPetCollectionDetail(@PathVariable(value = "pet-collection-id") Integer petCollectionId) {
        return ApiResponse.of(SuccessCode.PET_COLLECTION_GET_SUCCESS, petCollectionService.getPetCollectionDetail(petCollectionId));
    }
}
