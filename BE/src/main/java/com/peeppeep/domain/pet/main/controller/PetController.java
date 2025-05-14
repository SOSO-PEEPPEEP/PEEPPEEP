package com.peeppeep.domain.pet.main.controller;

import com.peeppeep.domain.pet.main.dto.request.PetInteractionRequestDTO;
import com.peeppeep.domain.pet.main.dto.request.PetRequestDTO;
import com.peeppeep.domain.pet.main.dto.response.InventoryResponseDTO;
import com.peeppeep.domain.pet.main.dto.response.PetListResponseDTO;
import com.peeppeep.domain.pet.main.dto.response.PetResponseDTO;
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

    @PostMapping("")
    public ApiResponse<Integer> createPet() {
        return ApiResponse.of(SuccessCode.PET_CREATE_SUCCESS, petService.createPet());
    }

    @PostMapping("/{pet-type-id}")
    public ApiResponse<Integer> createPetByPetType(@PathVariable(value = "pet-type-id") Integer petTypeId) {
        return ApiResponse.of(SuccessCode.PET_CREATE_SUCCESS, petService.createPetByPetType(petTypeId));
    }

    @PutMapping("/{pet-id}/interaction")
    public ApiResponse<PetResponseDTO> interactPetByItem(@PathVariable("pet-id") Integer petId, @RequestBody PetInteractionRequestDTO PetInteractionRequestDTO) {
        return ApiResponse.of(SuccessCode.PET_INTERACT_SUCCESS, petService.interactPetByItem(petId, PetInteractionRequestDTO));
    }

    @GetMapping("/my")
    public ApiResponse<List<PetListResponseDTO>> getMyPets() {
        return ApiResponse.of(SuccessCode.PET_GET_SUCCESS, petService.getMyPets());
    }

    @GetMapping("/main")
    public ApiResponse<PetResponseDTO> getMainPet() {
        return ApiResponse.of(SuccessCode.PET_GET_SUCCESS, petService.getMainPet());
    }

    @GetMapping("/{pet-id}")
    public ApiResponse<PetResponseDTO> getPetDetail(@PathVariable(value = "pet-id") Integer petId) {
        return ApiResponse.of(SuccessCode.PET_GET_SUCCESS, petService.getPetDetail(petId));
    }

    @PutMapping("/{pet-id}")
    public ApiResponse<Integer> updatePet(@PathVariable(value = "pet-id") Integer petId, @RequestBody PetRequestDTO petRequestDTO) {
        return ApiResponse.of(SuccessCode.PET_UPDATE_SUCCESS, petService.updatePet(petId, petRequestDTO));
    }

    @DeleteMapping("/{pet-id}")
    public ApiResponse<Boolean> deletePet(@PathVariable(value = "pet-id") Integer petId) {
        return ApiResponse.of(SuccessCode.PET_DELETE_SUCCESS, petService.deletePet(petId));
    }

    @PutMapping("/{pet-id}/favorite")
    public ApiResponse<Integer> updateFavorite(@PathVariable(value = "pet-id") Integer petId) {
        return ApiResponse.of(SuccessCode.FAVORITE_UPDATE_SUCCESS, petService.updateFavorite(petId));
    }

    @GetMapping("/inventories")
    public ApiResponse<List<InventoryResponseDTO>> getInventories() {
        return ApiResponse.of(SuccessCode.INVENTORY_GET_SUCCESS, petService.getInventories());
    }
}
