package com.peeppeep.domain.challenge.main.service;

import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeListResponseDTO;
import com.peeppeep.domain.challenge.main.entity.Category;
import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.repository.CategoryRepository;
import com.peeppeep.domain.challenge.main.repository.ChallengeRepository;
import com.peeppeep.domain.challenge.main.repository.ChallengeUserRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ChallengeUserRepository challengeUserRepository;

    @Transactional
    public Integer createChallenge(Integer userId, ChallengeRequestDTO challengeRequestDTO) {

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.NOT_FOUND_ERROR, ErrorCode.NOT_FOUND_ERROR.getMessage()));

        // 참여자 리스트
        List<User> participants = Optional.ofNullable(challengeRequestDTO.getParticipants())
                .filter(ids -> !ids.isEmpty())
                .map(userRepository::findAllByIdAndDeletedAtIsNull)
                .orElse(Collections.emptyList());

        // 카테고리
        Category category = categoryRepository.findById(challengeRequestDTO.getCategory())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND_ERROR, ErrorCode.NOT_FOUND_ERROR.getMessage()));

        // User, requestDTO, 카테고리, 참여자 리스트를 기반으로 Challenge 생성 후 저장
        Challenge challenge = challengeRepository.save(Challenge.of(user, challengeRequestDTO, category, participants));

        // 챌린지 ID 반환
        return challenge.getChallengeId();
    }

    public List<ChallengeListResponseDTO> getChallenges(Integer userId) {

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.NOT_FOUND_ERROR, ErrorCode.NOT_FOUND_ERROR.getMessage()));

        // User기반으로 있는 챌린지목록 조회
        List<Challenge> challenges = challengeUserRepository.findChallengesByUserAndDeletedAtIsNull(user);

        // 챌린지 리스트 DTO 리스트로 변환 후 반환
        return challenges.stream()
                .map(ChallengeListResponseDTO::of)
                .collect(Collectors.toList());
    }
}
