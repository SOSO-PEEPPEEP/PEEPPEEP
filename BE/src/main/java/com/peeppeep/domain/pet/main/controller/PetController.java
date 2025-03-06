package com.peeppeep.domain.pet.main.controller;

import com.peeppeep.domain.pet.main.dto.PetDTO;
import com.peeppeep.domain.pet.main.dto.response.PetListResponseDTO;
import com.peeppeep.domain.pet.main.service.PetService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @PostMapping("/{pet-type-id}")
    public ApiResponse<Integer> createPet(@PathVariable(value = "pet-type-id") Integer petTypeId) {
        return ApiResponse.of(SuccessCode.PET_CREATE_SUCCESS, petService.createPet(petTypeId));
    }

    @GetMapping("/my")
    public ApiResponse<List<PetListResponseDTO>> getMyPets() {
        return ApiResponse.of(SuccessCode.PET_GET_SUCCESS, petService.getMyPets());
    }

    @GetMapping("/{pet-id}")
    public ApiResponse<PetDTO> getPetDetail(@PathVariable(value = "pet-id") Integer petId) {
        return ApiResponse.of(SuccessCode.PET_GET_SUCCESS, petService.getPetDetail(petId));
    }
}
