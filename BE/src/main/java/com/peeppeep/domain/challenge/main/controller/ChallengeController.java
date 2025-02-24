package com.peeppeep.domain.challenge.main.controller;

import com.peeppeep.domain.challenge.main.dto.ChallengeDTO;
import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.service.ChallengeService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("/{user_id}")
    public ApiResponse<Integer> createChallenge(@PathVariable(value = "user_id") Integer userId, @RequestBody ChallengeRequestDTO challengeRequestDTO) {
        return ApiResponse.of(SuccessCode.CHALLENGE_CREATE_SUCCESS, challengeService.createChallenge(userId, challengeRequestDTO));
    }
}
