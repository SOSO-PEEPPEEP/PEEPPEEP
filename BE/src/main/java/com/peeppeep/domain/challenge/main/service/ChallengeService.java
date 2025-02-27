package com.peeppeep.domain.challenge.main.service;

import com.peeppeep.domain.challenge.main.dto.ChallengeDTO;
import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeListResponseDTO;
import com.peeppeep.domain.challenge.main.entity.Category;
import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.IsPublicType;
import com.peeppeep.domain.challenge.main.entity.RoleType;
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
    private final ChallengeUserService challengeUserService;

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ChallengeUserRepository challengeUserRepository;

    /*챌린지 생성*/
    @Transactional
    public Integer createChallenge(ChallengeRequestDTO challengeRequestDTO) {
        //임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // 참여자 리스트
        List<User> participants = Optional.ofNullable(challengeRequestDTO.getParticipants())
                .filter(ids -> !ids.isEmpty())
                .map(userRepository::findAllByIdAndDeletedAtIsNull)
                .orElse(Collections.emptyList());

        // 카테고리
        Category category = categoryRepository.findById(challengeRequestDTO.getCategory())
                .orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_EXIST, ErrorCode.CATEGORY_NOT_EXIST.getMessage()));

        // requestDTO, 카테고리 기반으로 Challenge 생성 후 저장
        Challenge challenge = Challenge.of(challengeRequestDTO, category);
        challengeRepository.save(challenge);

        // 챌린지장 및 참여자 추가
        challengeUserService.setOrganizer(user, challenge);
        challengeUserService.addParticipants(challenge, participants);

        // 챌린지 ID 반환
        return challenge.getChallengeId();
    }

    /*나의 챌린지 목록 조회*/
    public List<ChallengeListResponseDTO> getMyChallenges() {
        //임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // User기반으로 있는 챌린지목록 조회
        List<Challenge> challenges = challengeUserRepository.findChallengesByUserAndDeletedAtIsNull(user);

        // 챌린지 리스트 DTO 리스트로 변환 후 반환
        return challenges.stream()
                .map(ChallengeListResponseDTO::of)
                .collect(Collectors.toList());
    }

    /*챌린지 상세 조회*/
    public ChallengeDTO getChallengeDetail(Integer challengeId) {
        //임의로 userId 설정
        Integer userId = 1;

        // Challenge 정보
        Challenge challenge = challengeRepository.findByChallengeIdAndDeletedAtIsNull(challengeId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

        // PUBLIC이 아닌 경우 조회가 가능한지 검토
        if(challenge.getIsPublic()!= IsPublicType.PUBLIC) {
            // User 정보
            User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                    .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

            // 해당 챌린지에 참여중인지 확인 -> 아닐 경우 추가 검사 후 throw
            if(!challengeUserRepository.existsByChallengeAndUserAndDeletedAtIsNull(challenge, user)) {
                //==FRIEND_ONLY 추가예정==//
                /**
                 * FRINED_ONLY && 참여자 친구 목록중에 해당하지 않으면 throw
                 * PRIVATE throw
                 */
                //아닐 경우에 예외처리
                throw(new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));
            }
        }

        return ChallengeDTO.of(challenge);
    }

    /*챌린지 수정*/
    @Transactional
    public Integer updateChallenge(Integer challengeId, ChallengeRequestDTO challengeRequestDTO) {
        //임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // Challenge 정보
        Challenge challenge = challengeRepository.findByChallengeIdAndDeletedAtIsNull(challengeId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

        // 요청자와 챌린지장이 동일한지 확인
        RoleType roleType = challengeUserRepository.findRoleByUserAndChallengeAndDeletedAtIsNull(user, challenge)
                .orElseThrow(() -> new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));

        if (roleType != RoleType.ORGANIZER) {
            throw new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage());
        }

        // 카테고리
        Integer categoryId = challengeRequestDTO.getCategory();
        Category category = null;
        if (categoryId != null) {
            category = categoryRepository.findById(challengeRequestDTO.getCategory())
                    .orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_EXIST, ErrorCode.CATEGORY_NOT_EXIST.getMessage()));
        }


        // 챌린지 기본 정보 업데이트
        challenge.updateChallenge(challengeRequestDTO, category);

        // 참여자 리스트
        List<User> newParticipants = Optional.ofNullable(challengeRequestDTO.getParticipants())
                .filter(ids -> !ids.isEmpty())
                .map(userRepository::findAllByIdAndDeletedAtIsNull)
                .orElse(Collections.emptyList());

        // 새로운 참여자 추가
        challengeUserService.addParticipants(challenge, newParticipants);

        // 기존 참가자 중에서 빠진 사람 제거
        challengeUserService.removeMissingParticipants(challenge, newParticipants);

        return challenge.getChallengeId();
    }
}
