package com.peeppeep.domain.challenge.main.service;

import com.peeppeep.domain.challenge.main.dto.ChallengeDTO;
import com.peeppeep.domain.challenge.main.dto.ChallengeResultItemDTO;
import com.peeppeep.domain.challenge.main.dto.DailyDTO;
import com.peeppeep.domain.challenge.main.dto.request.ChallengeRequestDTO;
import com.peeppeep.domain.challenge.main.dto.request.DailyRequestDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeListResponseDTO;
import com.peeppeep.domain.challenge.main.dto.response.ChallengeResultResponseDTO;
import com.peeppeep.domain.challenge.main.entity.*;
import com.peeppeep.domain.challenge.main.entity.Calendar;
import com.peeppeep.domain.challenge.main.repository.*;
import com.peeppeep.domain.pet.main.entity.Inventory;
import com.peeppeep.domain.pet.main.entity.Item;
import com.peeppeep.domain.pet.main.repository.InventoryRepository;
import com.peeppeep.domain.pet.main.repository.ItemRepository;
import com.peeppeep.domain.user.friend.repository.FriendRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.entity.S3Folder;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import com.peeppeep.global.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeService {
    private final ChallengeUserService challengeUserService;
    private final S3Service s3Service;

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ChallengeUserRepository challengeUserRepository;
    private final DailyRepository dailyRepository;
    private final CalendarRepository calendarRepository;
    private final FriendRepository friendRepository;
    private final ItemRepository itemRepository;
    private final InventoryRepository inventoryRepository;

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

            // 해당 챌린지에 참여중인지 확인
            if(!challengeUserRepository.existsByChallengeAndUserAndDeletedAtIsNull(challenge, user)) {
                User organizer = challengeUserRepository.findUserIdsByChallengeIdAndRole(challenge,RoleType.ORGANIZER)
                        .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

                //PRIVATE 혹은 챌린지장 친구 목록중에 해당하지 않으면 throw
                if(challenge.getIsPublic() == IsPublicType.PRIVATE ||
                    !friendRepository.existsFriendship(user.getUserId(),organizer.getUserId())) {
                    throw(new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));
                }

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

        // 북마크로 설정해두었다면, 사용자의 북마크 null 변환
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUserAndDeletedAtIsNull(challenge,user)
                .orElseThrow(() -> new BusinessException(ErrorCode.CHALLENGE_USER_NOT_EXIST, ErrorCode.CHALLENGE_USER_NOT_EXIST.getMessage()));
        if(user.getMainChallengeId()!=null && !user.getMainChallengeId().equals(challengeUser.getChallengeUserId())) {
            user.updateBookmark(challengeUser.getChallengeUserId());
        }

        challengeRepository.delete(challenge);

        return true;
    }

    /*챌린지 결산 미리보기 조회*/
    public ChallengeResultResponseDTO getPreviewChallengeResult(Integer challengeUserId) {
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

        // 해당 챌린지가 기간이 만료되었는지 확인
        LocalDate endAt = challengeUser.getChallenge().getEndAt();
        LocalDate today = LocalDate.now();

        if(!endAt.isBefore(today) || challengeUser.getIsCompleted()) {
            throw(new BusinessException(ErrorCode.CHALLENGE_NOT_COMPLETE,ErrorCode.CHALLENGE_NOT_COMPLETE.getMessage()));
        }

        // 챌린지 점수에 따른 결과물 계산
        /**
         * 7일 연속: 280점
         * 14일 연속: 1050점
         * 21일 연속: 2310점
         * 30일 연속: 4650점
         * ------------------------------
         * 점수 기준
         * COMMON : 0 ~ 279점
         * RARE : 280 ~ 1049점
         * UNIQUE : 1050점 ~ 2309점
         * EPIC : 2310 ~ 4649점
         * LEGENDARY : 4650점
         */
        int rareScore = 280;
        int uniqueScore = 1050;
        int epicScore = 2310;
        int legendaryScore = 4650;
        Integer resultScore = challengeUser.getResultScore();

        if(resultScore==0)
            return ChallengeResultResponseDTO.of(Collections.emptyList(), false);

        // 기본 지급 아이템 개수
        int baseItemNum = 1+resultScore/100;

        // 보너스 지급 아이템 개수
        int bonusItemNum;

        // Common
        if (resultScore < rareScore) {
            bonusItemNum=0;
        }
        // Rare
        else if(resultScore < uniqueScore) {
            bonusItemNum=10;
        }
        // Unique
        else if (resultScore < epicScore) {
            bonusItemNum=20;
        }
        // epic
        else if (resultScore < legendaryScore) {
            bonusItemNum=30;
        }
        // legendary
        else {
            bonusItemNum=50;
        }

        // 아이템 지급
        List<Item> allItems = itemRepository.findAll();
        Category bonusCategory = challengeUser.getChallenge().getCategory();
        List<ChallengeResultItemDTO> items = new ArrayList<>();
        for (Item item : allItems) {
            int addCount = baseItemNum;
            if (item.getCategory().equals(bonusCategory)) {
                addCount += bonusItemNum;
            }
            items.add(ChallengeResultItemDTO.of(item, addCount));
        }

        return ChallengeResultResponseDTO.of(items, true);
    }

    /*챌린지 결산*/
    @Transactional
    public ChallengeResultResponseDTO updateChallengeResult(Integer challengeUserId) {
        // preview 호출 후 추가될 item 조회
        ChallengeResultResponseDTO previewDto = getPreviewChallengeResult(challengeUserId);
        List<ChallengeResultItemDTO> items = previewDto.getItems();

        // ChallengeUser 정보
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeUserIdAndDeletedAtIsNull(challengeUserId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));
        // 챌린지 완료 갱신
        challengeUser.updateIsCompleted();
        challengeUserRepository.save(challengeUser);

        // 챌린지 성공 여부
        if(!previewDto.getSuccess())
            return previewDto;

        // Id 기반 아이템 전체 조회
        Map<Integer, Item> itemMap = itemRepository.findAll().stream()
                .collect(Collectors.toMap(Item::getItemId, Function.identity()));

        // 인벤토리 갱신 및 DTO 반환
        for (ChallengeResultItemDTO dto : items) {
            Item item = itemMap.get(dto.getItemId());
            Inventory inventory = inventoryRepository
                    .findByUserAndItemAndDeletedAtIsNull(challengeUser.getUser(), item)
                    .orElseGet(() -> Inventory.of(challengeUser.getUser(), item, 0));

            inventory.updateCountPlus(dto.getCount());
            inventoryRepository.save(inventory);
        }

        return previewDto;
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
        if(dailyRequestDTO.getPicture()!=null && !dailyRequestDTO.getPicture().isEmpty()) {
            String imgS3Url = s3Service.saveFile(dailyRequestDTO.getPicture(), S3Folder.DAILY_IMAGE);
            daily.updatePicture(imgS3Url);
        }
        dailyRepository.save(daily);

        // Challenge 연속일 및 점수 갱신
        challengeUser.updateStreakCountAndResultScorePlus();
        challengeUserRepository.save(challengeUser);

        // Calendar 갱신
        Calendar calendar = calendarRepository.findByChallengeUserAndDeletedAtIsNull(challengeUser)
                .orElseThrow(()->new BusinessException(ErrorCode.CALENDAR_NOT_EXIST,ErrorCode.CALENDAR_NOT_EXIST.getMessage()));
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
                .orElseThrow(()->new BusinessException(ErrorCode.CALENDAR_NOT_EXIST,ErrorCode.CALENDAR_NOT_EXIST.getMessage()));
        calendar.updateDayStatus(daily.getDay(),null);
        calendarRepository.save(calendar);

        // Daily 이미지 S3 삭제
        s3Service.deleteFile(daily.getPicture());

        // Daily Soft Delete
        dailyRepository.delete(daily);

        return true;
    }

    /*북마크 갱신*/
    @Transactional
    public Integer updateBookmark(Integer challengeUserId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // ChallengeUser 정보
        ChallengeUser challengeUser = challengeUserRepository.findByChallengeUserIdAndDeletedAtIsNull(challengeUserId)
                .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_USER_NOT_EXIST, ErrorCode.CHALLENGE_USER_NOT_EXIST.getMessage()));

        // 해당 챌린지에 참여중인지 확인
        if(!challengeUserRepository.existsByChallengeAndUserAndDeletedAtIsNull(challengeUser.getChallenge(), user)) {
            throw(new BusinessException(ErrorCode.CHALLENGE_ACCESS_DENIED, ErrorCode.CHALLENGE_ACCESS_DENIED.getMessage()));
        }

        // User 메인 챌린지 갱신

        Integer preMainChallengeId = user.getMainChallengeId();
        // 이전 챌린지 북마크 삭제
        if(preMainChallengeId!=null && !preMainChallengeId.equals(challengeUserId)) {
            ChallengeUser preMainChallenge = challengeUserRepository.findByChallengeUserIdAndDeletedAtIsNull(preMainChallengeId)
                    .orElseThrow(()->new BusinessException(ErrorCode.CHALLENGE_USER_NOT_EXIST, ErrorCode.CHALLENGE_USER_NOT_EXIST.getMessage()));
            preMainChallenge.updateBookmark(preMainChallenge.getIsBookmark());
            challengeUserRepository.save(preMainChallenge);
        }

        // 메인 챌린지 및 새 챌린지 북마크 생성
        user.updateBookmark(challengeUserId);
        challengeUser.updateBookmark(challengeUser.getIsBookmark());
        userRepository.save(user);
        challengeUserRepository.save(challengeUser);

        return user.getMainChallengeId();
    }
}
