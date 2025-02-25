package com.peeppeep.domain.challenge.main.service;

import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.repository.ChallengeRepository;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    @Transactional
    public Integer createChallenge(Integer userId, ChallengeRequestDTO challengeRequestDTO) {

        // User 정보
        User user = userRepository.findById(userId).orElseThrow(()->new BusinessException(ErrorCode.NOT_FOUND_ERROR, ErrorCode.NOT_FOUND_ERROR.getMessage()));

        // 참여자 리스트
        List<User> participants = Optional.ofNullable(challengeRequestDTO.getParticipants())
                .filter(ids -> !ids.isEmpty())
                .map(userRepository::findAllById)
                .orElse(Collections.emptyList());

        // User, requestDTO, 참여자 리스트를 기반으로 Challenge 생성 후 저장
        Challenge challenge = challengeRepository.save(Challenge.of(user, challengeRequestDTO, participants));

        // 챌린지 ID 반환
        return challenge.getChallengeId();
    }
}
