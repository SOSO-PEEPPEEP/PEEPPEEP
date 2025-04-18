package com.peeppeep.domain.challenge.main.controller;

import com.peeppeep.domain.challenge.main.dto.ChallengeDTO;
import com.peeppeep.domain.challenge.main.dto.DailyDTO;
import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.dto.request.DailyRequestDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeListResponseDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeResultResponseDTO;
import com.peeppeep.domain.challenge.main.service.ChallengeService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/{challenge-user-id}")
    public ApiResponse<ChallengeDTO> getChallengeDetail(@PathVariable(value = "challenge-user-id") Integer challengeUserId) {
        return ApiResponse.of(SuccessCode.CHALLENGE_GET_SUCCESS, challengeService.getChallengeDetail(challengeUserId));
    }

    @PutMapping("/{challenge-id}")
    public ApiResponse<Integer> updateChallenge(@PathVariable("challenge-id") Integer challengeId, @RequestBody ChallengeRequestDTO challengeRequestDTO) {
        return ApiResponse.of(SuccessCode.CHALLENGE_UPDATE_SUCCESS, challengeService.updateChallenge(challengeId, challengeRequestDTO));
    }

    @DeleteMapping("/{challenge-id}")
    public ApiResponse<Boolean> deleteChallenge(@PathVariable("challenge-id") Integer challengeId) {
        return ApiResponse.of(SuccessCode.CHALLENGE_DELETE_SUCCESS, challengeService.deleteChallenge(challengeId));
    }

    @GetMapping("/{challenge-user-id}/result")
    public ApiResponse<ChallengeResultResponseDTO> getChallengeResult(@PathVariable("challenge-user-id") Integer challengeUserId) {
        return ApiResponse.of(SuccessCode.CHALLENGE_RESULT_SUCCESS, challengeService.getChallengeResult(challengeUserId));
    }

    @PostMapping("/{challenge-user-id}/daily")
    public ApiResponse<Integer> createDaily(@PathVariable(value = "challenge-user-id") Integer challengeUserId, @ModelAttribute DailyRequestDTO dailyRequestDTO) {
        return ApiResponse.of(SuccessCode.DAILY_CREATE_SUCCESS, challengeService.createDaily(challengeUserId,dailyRequestDTO));
    }

    @GetMapping("/daily/{daily-id}")
    public ApiResponse<DailyDTO> getDaily(@PathVariable(value = "daily-id") Integer dailyId) {
        return ApiResponse.of(SuccessCode.DAILY_GET_SUCCESS, challengeService.getDaily(dailyId));
    }

    @DeleteMapping("/daily/{daily-id}")
    public ApiResponse<Boolean> deleteDaily(@PathVariable(value = "daily-id") Integer dailyId) {
        return ApiResponse.of(SuccessCode.DAILY_DELETE_SUCCESS, challengeService.deleteDaily(dailyId));
    }

    @PutMapping("/{challenge-user-id}/bookmark")
    public ApiResponse<Integer> updateBookmark(@PathVariable(value = "challenge-user-id") Integer challengeUserId) {
        return ApiResponse.of(SuccessCode.BOOKMARK_UPDATE_SUCCESS, challengeService.updateBookmark(challengeUserId));
    }
}
