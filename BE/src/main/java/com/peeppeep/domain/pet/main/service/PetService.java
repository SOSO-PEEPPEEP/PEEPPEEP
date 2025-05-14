package com.peeppeep.domain.pet.main.service;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetRankType;
import com.peeppeep.domain.pet.collection.entity.PetType;
import com.peeppeep.domain.pet.collection.repository.PetCollectionRepository;
import com.peeppeep.domain.pet.collection.repository.PetTypeRepository;
import com.peeppeep.domain.pet.main.dto.request.PetInteractionRequestDTO;
import com.peeppeep.domain.pet.main.dto.request.PetRequestDTO;
import com.peeppeep.domain.pet.main.dto.response.InventoryResponseDTO;
import com.peeppeep.domain.pet.main.dto.response.PetListResponseDTO;
import com.peeppeep.domain.pet.main.dto.response.PetResponseDTO;
import com.peeppeep.domain.pet.main.entity.GrowthType;
import com.peeppeep.domain.pet.main.entity.Inventory;
import com.peeppeep.domain.pet.main.entity.Item;
import com.peeppeep.domain.pet.main.entity.Pet;
import com.peeppeep.domain.pet.main.repository.InventoryRepository;
import com.peeppeep.domain.pet.main.repository.PetRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetService {
    private final Random random = new Random();

    private final InventoryRepository inventoryRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final PetCollectionRepository petCollectionRepository;
    private final PetTypeRepository petTypeRepository;

    /**펫 등급 별 확률
     * 합산 100(%) */
    private static final Map<PetRankType, Double> PROBABILITY_MAP = Map.of(
            PetRankType.COMMON, 50.0,
            PetRankType.RARE, 30.0,
            PetRankType.UNIQUE, 10.0,
            PetRankType.EPIC, 7.0,
            PetRankType.LEGENDARY, 3.0
    );

    /*펫 랜덤 생성*/
    @Transactional
    public Integer createPet(){
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // 펫 목록 조회
        List<PetCollection> availablePets = petCollectionRepository.findAll();
        if (availablePets.isEmpty()) {
            throw new BusinessException(ErrorCode.PET_COLLECTION_NOT_EXIST, ErrorCode.PET_COLLECTION_NOT_EXIST.getMessage());
        }

        // 랭크 랜덤 선정 후, 해당 랭크의 펫 목록 조회
        PetRankType selectedRank = RandomRankSelection(availablePets);
        List<PetCollection> filteredPets = availablePets.stream()
                .filter(pet -> pet.getPetRank() == selectedRank)
                .toList();
        if (filteredPets.isEmpty()) {
            throw new BusinessException(ErrorCode.PET_RANK_NOT_EXIST, ErrorCode.PET_RANK_NOT_EXIST.getMessage());
        }

        // 특정 랭크의 펫 랜덤 선정
        PetCollection selectedPet = filteredPets.get(random.nextInt(filteredPets.size()));

        // 펫 생성
        Pet pet = Pet.of(user, selectedPet);
        petRepository.save(pet);

        return selectedPet.getPetCollectionId();
    }

    /*특정 타입의 펫 랜덤 생성*/
    @Transactional
    public Integer createPetByPetType(Integer petTypeId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // 펫 목록 조회
        PetType petType = petTypeRepository.findById(petTypeId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_TYPE_NOT_EXIST, ErrorCode.PET_TYPE_NOT_EXIST.getMessage()));
        List<PetCollection> availablePets = petCollectionRepository.findByPetType(petType);
        if (availablePets.isEmpty()) {
            throw new BusinessException(ErrorCode.PET_COLLECTION_NOT_EXIST, ErrorCode.PET_COLLECTION_NOT_EXIST.getMessage());
        }

        // 랭크 랜덤 선정 후, 해당 랭크의 펫 목록 조회
        PetRankType selectedRank = RandomRankSelection(availablePets);
        List<PetCollection> filteredPets = availablePets.stream()
                .filter(pet -> pet.getPetRank() == selectedRank)
                .toList();
        if (filteredPets.isEmpty()) {
            throw new BusinessException(ErrorCode.PET_RANK_NOT_EXIST, ErrorCode.PET_RANK_NOT_EXIST.getMessage());
        }

        // 특정 랭크의 펫 랜덤 선정
        PetCollection selectedPet = filteredPets.get(random.nextInt(filteredPets.size()));

        // 펫 생성
        Pet pet = Pet.of(user, selectedPet);
        petRepository.save(pet);

        return selectedPet.getPetCollectionId();
    }

    /*랜덤 랭크 선정*/
    private PetRankType RandomRankSelection(List<PetCollection> availablePets) {
        // 존재하는 등급 가져오기
        List<PetRankType> existingRanks = availablePets.stream()
                .map(PetCollection::getPetRank)
                .distinct()
                .toList();

        // 존재하는 등급의 확률 합산
        double totalProbability = existingRanks.stream()
                .mapToDouble(PROBABILITY_MAP::get)
                .sum();

        // 0~100 난수 생성
        double randomValue = random.nextDouble() * 100;
        double cumulativeProbability = 0.0;

        // 난수와 비교하여 랭크 결정 (수치는 존재하는 등급을 100% 기준으로 보정)
        for (PetRankType rank : existingRanks) {
            cumulativeProbability += (PROBABILITY_MAP.get(rank) / totalProbability) * 100;
            if (randomValue < cumulativeProbability) {
                return rank;
            }
        }

        // 모두 해당되지 않을 경우 마지막 등급 return
        return existingRanks.get(existingRanks.size() - 1);
    }

    /*펫 상호작용*/
    public PetResponseDTO interactPetByItem(Integer petId, PetInteractionRequestDTO petInteractionRequestDTO) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // 펫 정보
        Pet pet = petRepository.findById(petId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST,ErrorCode.PET_NOT_EXIST.getMessage()));
        // 펫 도감
        PetCollection petCollection = pet.getPetCollection();
        // 펫 타입
        PetType petType = petCollection.getPetType();

        // 아이템 정보
        Integer inventoryId = petInteractionRequestDTO.getInventoryId();
        Integer count = petInteractionRequestDTO.getCount();
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(()->new BusinessException(ErrorCode.INVENTORY_NOT_EXIST, ErrorCode.INVENTORY_NOT_EXIST.getMessage()));
        Item item = inventory.getItem();

        //Item 사용으로 인한 INVENTORY count -1
        if(inventory.getCount()<count){
            throw new BusinessException(ErrorCode.ITEM_COUNT_LOW, ErrorCode.ITEM_COUNT_LOW.getMessage());
        }
        inventory.updateCountMinus(count);
        inventoryRepository.save(inventory);

        //성장도에 따른 애정도 최대치
        int affectionMax = 0;
        GrowthType growthType = pet.getGrowth();
        affectionMax = switch (growthType) {
            case EGG -> 100;
            case BABY -> 120;
            case YOUTH -> 200;
            default -> 0;
        };

        //보너스 상승률 적용 펫에 대한 애정도 증가량 추가
        int addrate = 0;
        if(petType.getPetTypeId().equals(item.getPetType().getPetTypeId())) {
            addrate = 2;
        }

        int rate = item.getRate();

        //애정도 최대치 달성 시 성장도 증가
        int increasedAffection = pet.getAffection() + rate + addrate;
        if(increasedAffection > affectionMax){
            increasedAffection = switch (growthType) {
                case EGG -> {
                    growthType = GrowthType.BABY;
                    yield increasedAffection - affectionMax;
                }
                case BABY -> {
                    growthType = GrowthType.YOUTH;
                    yield increasedAffection - affectionMax;
                }
                default -> {
                    growthType = GrowthType.ADULT;
                    yield 200;
                }
            };
        }

        pet.updateGrowth(growthType);
        pet.updateAffection(increasedAffection);
        petRepository.save(pet);

        return PetResponseDTO.of(pet);
    }

    /*나의 펫 목록 조회*/
    public List<PetListResponseDTO> getMyPets() {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // User기반으로 있는 펫목록 조회
        List<Pet> pets = petRepository.findByUserAndDeletedAtIsNull(user);

        return pets.stream()
                .map(PetListResponseDTO::of)
                .collect(Collectors.toList());
    }

    /*메인 펫 조회*/
    public PetResponseDTO getMainPet() {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // 펫 정보
        Pet pet = petRepository.findById(user.getMainPetId())
                .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST,ErrorCode.PET_NOT_EXIST.getMessage()));

        return PetResponseDTO.of(pet);
    }

    /*펫 상세 조회*/
    public PetResponseDTO getPetDetail(Integer petId) {
        // 펫 정보
        Pet pet = petRepository.findById(petId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST,ErrorCode.PET_NOT_EXIST.getMessage()));

        return PetResponseDTO.of(pet);
    }

    /*펫 정보 수정*/
    @Transactional
    public Integer updatePet(Integer petId, PetRequestDTO petRequestDTO) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // Pet 정보
        Pet pet = petRepository.findByPetIdAndDeletedAtIsNull(petId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST, ErrorCode.PET_NOT_EXIST.getMessage()));

        // 요청자와 펫 주인이 동일한지 확인
        if(!pet.getUser().getUserId().equals(user.getUserId())) {
            throw new BusinessException(ErrorCode.PET_ACCESS_DENIED, ErrorCode.PET_ACCESS_DENIED.getMessage());
        }

        // 펫 정보 업데이트
        pet.updatePet(petRequestDTO);

        return pet.getPetId();
    }

    /*펫 삭제*/
    @Transactional
    public Boolean deletePet(Integer petId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // Pet 정보
        Pet pet = petRepository.findByPetIdAndDeletedAtIsNull(petId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST, ErrorCode.PET_NOT_EXIST.getMessage()));

        // 요청자와 펫 주인이 동일한지 확인
        if(!pet.getUser().getUserId().equals(user.getUserId())) {
            throw new BusinessException(ErrorCode.PET_ACCESS_DENIED, ErrorCode.PET_ACCESS_DENIED.getMessage());
        }

        petRepository.delete(pet);

        return true;
    }

    public Integer updateFavorite(Integer petId) {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // Pet 정보
        Pet pet = petRepository.findByPetIdAndDeletedAtIsNull(petId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST, ErrorCode.PET_NOT_EXIST.getMessage()));

        // 요청자와 펫 주인이 동일한지 확인
        if(!pet.getUser().getUserId().equals(user.getUserId())) {
            throw new BusinessException(ErrorCode.PET_ACCESS_DENIED, ErrorCode.PET_ACCESS_DENIED.getMessage());
        }

        // User 메인 펫 갱신

        Integer preMainPetId = user.getMainPetId();
        // 이전 메인 펫 삭제
        if(preMainPetId!=null && !preMainPetId.equals(petId)) {
            Pet preMainPet = petRepository.findByPetIdAndDeletedAtIsNull(preMainPetId)
                    .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST, ErrorCode.PET_NOT_EXIST.getMessage()));
            preMainPet.updateFavorite(preMainPet.getIsFavorite());
            petRepository.save(preMainPet);
        }

        // 메인 펫 및 새 펫 즐겨찾기 갱신
        user.updateFavorite(petId);
        pet.updateFavorite(pet.getIsFavorite());
        userRepository.save(user);
        petRepository.save(pet);

        return user.getMainPetId();
    }

    /*인벤토리의 아이템 조회*/
    public List<InventoryResponseDTO> getInventories() {
        // 임의로 userId 설정
        Integer userId = 1;

        // User 정보
        User user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        List<Inventory> inventories = inventoryRepository.findByUserAndDeletedAtIsNull(user);

        return inventories.stream()
                .map(InventoryResponseDTO::of)
                .collect(Collectors.toList());
    }
}
