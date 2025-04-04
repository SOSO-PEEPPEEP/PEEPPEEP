package com.peeppeep.domain.pet.main.controller;

import com.peeppeep.domain.pet.main.dto.PetDTO;
import com.peeppeep.domain.pet.main.dto.request.PetRequestDTO;
import com.peeppeep.domain.pet.main.dto.response.PetListResponseDTO;
import com.peeppeep.domain.pet.main.service.PetService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @RequestMapping(value = "/{pet-id}", method = RequestMethod.PUT)
    public Map<String, Object> Interaction(HttpSession session, @PathVariable("pet-id") Integer petId, @RequestParam("itemId") Integer itemId, @RequestParam("petCollectionId") Integer colId) {
        int userId = (int) session.getAttribute("userId");
        return petService.Interaction(userId, petId, itemId, colId);
    }

    @GetMapping("/my")
    public ApiResponse<List<PetListResponseDTO>> getMyPets() {
        return ApiResponse.of(SuccessCode.PET_GET_SUCCESS, petService.getMyPets());
    }

    @GetMapping("/{pet-id}")
    public ApiResponse<PetDTO> getPetDetail(@PathVariable(value = "pet-id") Integer petId) {
        return ApiResponse.of(SuccessCode.PET_GET_SUCCESS, petService.getPetDetail(petId));
    }

    @PutMapping("/info/{pet-id}")
    public ApiResponse<Integer> updatePet(@PathVariable(value = "pet-id") Integer petId, @RequestBody PetRequestDTO petRequestDTO) {
        return ApiResponse.of(SuccessCode.PET_UPDATE_SUCCESS, petService.updatePet(petId, petRequestDTO));
    }

    @DeleteMapping("/{pet-id}")
    public ApiResponse<Boolean> deletePet(@PathVariable(value = "pet-id") Integer petId) {
        return ApiResponse.of(SuccessCode.PET_DELETE_SUCCESS, petService.deletePet(petId));
    }
}
