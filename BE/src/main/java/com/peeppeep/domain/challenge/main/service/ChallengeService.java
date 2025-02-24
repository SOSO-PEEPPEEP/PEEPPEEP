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

        Challenge challenge = challengeRepository.save(Challenge.of(challengeRequestDTO));
        return challenge.getChallengeId();
    }
}
