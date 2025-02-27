package com.peeppeep.domain.challenge.main.controller;

import com.peeppeep.domain.challenge.main.dto.ChallengeDTO;
import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeListResponseDTO;
import com.peeppeep.domain.challenge.main.service.ChallengeService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("")
    public ApiResponse<Integer> createChallenge(@RequestBody ChallengeRequestDTO challengeRequestDTO) {
        return ApiResponse.of(SuccessCode.CHALLENGE_CREATE_SUCCESS, challengeService.createChallenge(challengeRequestDTO));
    }

    @GetMapping("/my")
    public ApiResponse<List<ChallengeListResponseDTO>> getMyChallenges() {
        return ApiResponse.of(SuccessCode.CHALLENGE_GET_SUCCESS, challengeService.getMyChallenges());
    }

    @GetMapping("/{challenge-id}")
    public ApiResponse<ChallengeDTO> getChallengeDetail(@PathVariable(value = "challenge-id") Integer challengeId) {
        return ApiResponse.of(SuccessCode.CHALLENGE_GET_SUCCESS, challengeService.getChallengeDetail(challengeId));
    }

    @PutMapping("/{challenge-id}")
    public ApiResponse<Integer> updateChallenge(@PathVariable("challenge-id") Integer challengeId, @RequestBody ChallengeRequestDTO challengeRequestDTO) {
        return ApiResponse.of(SuccessCode.CHALLENGE_UPDATE_SUCCESS, challengeService.updateChallenge(challengeId, challengeRequestDTO));
    }
}
