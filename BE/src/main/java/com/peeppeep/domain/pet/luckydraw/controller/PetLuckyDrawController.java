package com.peeppeep.domain.pet.luckydraw.controller;

import com.peeppeep.domain.pet.luckydraw.dto.PetLuckyDrawDTO;
import com.peeppeep.domain.pet.luckydraw.service.PetLuckyDrawService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetLuckyDrawController {

    private final PetLuckyDrawService petLuckyDrawService;

    @GetMapping("/lucky-draw/{pet-collection-id}")
    public ApiResponse<PetLuckyDrawDTO> getLuckyDraw(@PathVariable(value = "pet-collection-id") Integer petCollectionId) {
        return ApiResponse.of(SuccessCode.PET_LUCKY_DRAW_GET_SUCCESS, petLuckyDrawService.getLuckyDraw(petCollectionId));
    }
}
