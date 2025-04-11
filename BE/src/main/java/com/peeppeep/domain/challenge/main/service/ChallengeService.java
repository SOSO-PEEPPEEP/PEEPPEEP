package com.peeppeep.domain.challenge.main.service;

import com.peeppeep.domain.challenge.main.dto.ChallengeDTO;
import com.peeppeep.domain.challenge.main.dto.DailyDTO;
import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.dto.request.DailyRequestDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeListResponseDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeResultResponseDTO;
import com.peeppeep.domain.challenge.main.entity.*;
import com.peeppeep.domain.challenge.main.repository.*;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private final DailyRepository dailyRepository;
    private final CalendarRepository calendarRepository;

    /*챌린지 생성*/
    @Transactional
    public Integer createChallenge(ChallengeRequestDTO challengeRequestDTO) {
        // 임의로 userId 설정
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
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // User기반으로 있는 챌린지목록 조회
        List<ChallengeUser> challengeUsers = challengeUserRepository.findAllByUserAndDeletedAtIsNull(user);
        // 챌린지 목록 중 완료되지 않은 목록만 조회
        List<ChallengeUser> incompleteChallengeUsers = challengeUsers.stream()
                .filter(challengeUser -> !challengeUser.getIsCompleted())
                .toList();

        // 챌린지 리스트 DTO 리스트로 변환 후 반환
        return incompleteChallengeUsers.stream()
                .map(ChallengeListResponseDTO::of)
                .collect(Collectors.toList());
    }

    /*챌린지 상세 조회*/
    public ChallengeDTO getChallengeDetail(Integer challengeUserId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // ChallengeUser 정보
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeUserIdAndDeletedAtIsNull(challengeUserId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

        // Challenge 정보
        Challenge challenge = challengeUser.getChallenge();

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

        return ChallengeDTO.of(challengeUser);
    }

    /*챌린지 수정*/
    @Transactional
    public Integer updateChallenge(Integer challengeId, ChallengeRequestDTO challengeRequestDTO) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // Challenge 정보
        Challenge challenge = challengeRepository.findById(challengeId)
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

    /*챌린지 삭제*/
    @Transactional
    public Boolean deleteChallenge(Integer challengeId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // Challenge 정보
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

        // 요청자와 챌린지장이 동일한지 확인
        RoleType roleType = challengeUserRepository.findRoleByUserAndChallengeAndDeletedAtIsNull(user, challenge)
                .orElseThrow(() -> new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));

        if (roleType != RoleType.ORGANIZER) {
            throw new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage());
        }

        challengeRepository.delete(challenge);

        return true;
    }

    /*챌린지 결산*/
    @Transactional
    public ChallengeResultResponseDTO getChallengeResult(Integer challengeUserId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // ChallengeUser 정보
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeUserIdAndDeletedAtIsNull(challengeUserId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

        // 해당 챌린지에 참여중인지 확인
        if(!challengeUserRepository.existsByChallengeAndUserAndDeletedAtIsNull(challengeUser.getChallenge(), user)) {
            throw(new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));
        }

        // 완료 갱신
        challengeUser.updateIsCompleted();
        challengeUserRepository.save(challengeUser);

        // 챌린지 점수에 따른 결과물 계산
        /**
         * 7일 연속: 약 161점
         * 14일 연속: 약 959점
         * 21일 연속: 약 3080점
         * 30일 연속: 약 8855점
         * ------------------------------
         * 점수 기준
         * COMMON : 약 0 ~ 160점
         * RARE : 약 161 ~ 960점
         * UNIQUE : 약 961 ~ 3,080점
         * EPIC : 약 3,081 ~ 7,210점
         * LEGENDARY : 약 7,211 ~ 8,855점
         */
        int commonScore = 160;
        int rareScore = 960;
        int uniqueScore = 3080;
        int epicScore = 7210;
        int resultScore = challengeUser.getResultScore();

        //==아이템 관련 로직은 추후 추가==//
        // Common
        if (resultScore<=commonScore) {

        }
        // Rare
        else if(resultScore<=rareScore) {

        }
        // Unique
        else if (resultScore<=uniqueScore) {

        }
        // epic
        else if (resultScore<=epicScore) {

        }
        // legendary
        else {

        }


        //==ItemDTOList를 담을 예정==//
        // 임의의 아이템 return

        List<String> items = new ArrayList<>();
        items.add("당근");
        items.add("샤워기");
        items.add("덤벨");
        items.add("휴지");
        items.add("장난감");

        return ChallengeResultResponseDTO.of(items);
    }

    /*챌린지 데일리 생성*/
    @Transactional
    public Integer createDaily(Integer challengeUserId, DailyRequestDTO dailyRequestDTO) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // ChallengeUser 정보
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeUserIdAndDeletedAtIsNull(challengeUserId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

        // 해당 챌린지에 참여중인지 확인
        if(!challengeUserRepository.existsByChallengeAndUserAndDeletedAtIsNull(challengeUser.getChallenge(), user)) {
            throw(new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));
        }

        // Daily 생성
        Daily daily = Daily.of(challengeUser, dailyRequestDTO);
        dailyRepository.save(daily);

        // Challenge 연속일 및 점수 갱신
        challengeUser.updateStreakCountAndResultScorePlus();
        challengeUserRepository.save(challengeUser);

        // Calendar 갱신
        Calendar calendar = calendarRepository.findByChallengeUserAndDeletedAtIsNull(challengeUser)
                .orElseThrow(()->new BusinessException(ErrorCode.CALENDAR_NOT_FOUND,ErrorCode.CALENDAR_NOT_FOUND.getMessage()));
        calendar.updateDayStatus(dailyRequestDTO.getDay(),daily.getDailyId());
        calendarRepository.save(calendar);

        return daily.getDailyId();
    }

    /*챌린지 데일리 조회*/
    public DailyDTO getDaily(Integer dailyId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // Daily 정보
        Daily daily = dailyRepository.findByDailyIdAndDeletedAtIsNull(dailyId)
                .orElseThrow(()->new BusinessException(ErrorCode.DAILY_NOT_EXIST, ErrorCode.DAILY_NOT_EXIST.getMessage()));

        // Challenge 정보
        Challenge challenge = daily.getChallengeUser().getChallenge();

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

        return DailyDTO.of(daily);
    }

    /*챌린지 데일리 삭제*/
    @Transactional
    public Boolean deleteDaily(Integer dailyId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // Daily 정보
        Daily daily = dailyRepository.findByDailyIdAndDeletedAtIsNull(dailyId)
                .orElseThrow(()->new BusinessException(ErrorCode.DAILY_NOT_EXIST, ErrorCode.DAILY_NOT_EXIST.getMessage()));

        // ChallengeUser 정보
        ChallengeUser challengeUser = daily.getChallengeUser();

        // 해당 챌린지에 참여중인지 확인
        if(!challengeUserRepository.existsByChallengeAndUserAndDeletedAtIsNull(challengeUser.getChallenge(), user)) {
            throw(new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));
        }

        // Challenge 연속일 및 점수 갱신
        challengeUser.updateStreakCountAndResultScoreMinus();
        challengeUserRepository.save(challengeUser);

        // Calendar 갱신
        Calendar calendar = calendarRepository.findByChallengeUserAndDeletedAtIsNull(challengeUser)
                .orElseThrow(()->new BusinessException(ErrorCode.CALENDAR_NOT_FOUND,ErrorCode.CALENDAR_NOT_FOUND.getMessage()));
        calendar.updateDayStatus(daily.getDay(),null);
        calendarRepository.save(calendar);

        dailyRepository.delete(daily);

        return true;
    }
}
