package com.peeppeep.domain.pet.main.service;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetRankType;
import com.peeppeep.domain.pet.collection.entity.PetType;
import com.peeppeep.domain.pet.collection.repository.PetCollectionRepository;
import com.peeppeep.domain.pet.collection.repository.PetTypeRepository;
import com.peeppeep.domain.pet.main.dto.PetDTO;
import com.peeppeep.domain.pet.main.dto.request.PetRequestDTO;
import com.peeppeep.domain.pet.main.dto.response.PetListResponseDTO;
import com.peeppeep.domain.pet.main.entity.GrowthType;
import com.peeppeep.domain.pet.main.entity.Inventory;
import com.peeppeep.domain.pet.main.entity.Item;
import com.peeppeep.domain.pet.main.entity.Pet;
import com.peeppeep.domain.pet.main.repository.InventoryRepository;
import com.peeppeep.domain.pet.main.repository.ItemRepository;
import com.peeppeep.domain.pet.main.repository.PetRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetService {
    private final Random random = new Random();

    private final InventoryRepository inventoryRepository;
    private final PetRepository petRepository;
    private final ItemRepository itemRepository;
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

    /*펫 생성*/
    @Transactional
    public Integer createPet(Integer petTypeId) {
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
            throw new BusinessException(ErrorCode.PET_COLLECTION_NOT_FOUND, ErrorCode.PET_COLLECTION_NOT_FOUND.getMessage());
        }

        // 랭크 랜덤 선정 후, 해당 랭크의 펫 목록 조회
        PetRankType selectedRank = RandomRankSelection(availablePets);
        List<PetCollection> filteredPets = availablePets.stream()
                .filter(pet -> pet.getPetRank() == selectedRank)
                .toList();
        if (filteredPets.isEmpty()) {
            throw new BusinessException(ErrorCode.PET_RANK_NOT_FOUND, ErrorCode.PET_RANK_NOT_FOUND.getMessage());
        }

        // 특정 랭크의 펫 랜덤 선정
        PetCollection selectedPet = filteredPets.get(random.nextInt(filteredPets.size()));

        // 펫 생성
        Pet pet = Pet.of(user, selectedPet);
        petRepository.save(pet);

        return pet.getPetId();
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
    public Map<String, Object> Interaction(int userId, int petId, int itemId, int colId) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userInfo = userRepository.isIdPresent(userId);
        User user = userInfo.get();

        Optional<Item> iteminfo = itemRepository.iteminfo(itemId);
        Item item = iteminfo.get();

        Optional<Pet> petInfo = petRepository.petInfo(user, petId);
        Pet pet = petInfo.get();

        Optional<PetCollection> petColLectionInfo = petCollectionRepository.petTypeId(colId);
        PetCollection petCollection = petColLectionInfo.get();
        PetType petType = petCollection.getPetType();

        if(user != null) {

            //Item 사용으로 인한 INVENTORY count -1
            Optional<Inventory> invenItemCnt = inventoryRepository.inventoryCountInfo(user, item);

            Inventory inven = invenItemCnt.get();
            if(inven.getCount() > 0){
                int usedItemCount = inven.getCount() - 1;
                inven.setCount(usedItemCount);
            }else{
                response.put("success", false);
                response.put("message", ErrorCode.UPDATE_ERROR);
                return response;
            }

            try{
                inventoryRepository.save(inven);
                response.put("success", true);
                response.put("message", SuccessCode.UPDATE_SUCCESS);
            }catch(Exception e) {
                response.put("success", false);
                response.put("message", ErrorCode.UPDATE_ERROR);
                e.printStackTrace();
            }

            //성장도에 따른 애정도 최대치
            int affectionMax = 0;
            GrowthType growthType = pet.getGrowth();
            if(growthType.equals(GrowthType.EGG)) {
                affectionMax = 100;
            }else if(growthType.equals(GrowthType.BABY)) {
                affectionMax = 120;
            }else if(growthType.equals(GrowthType.YOUTH)) {
                affectionMax = 200;
            }else {
                affectionMax = 0;
            }

            //보너스 상승률 적용 펫에 대한 애정도 증가량 추가
            int addrate = 0;
            if(petType.getPetTypeId() == item.getPetType().getPetTypeId()) {
                addrate = 2;
            }

            int rate = itemRepository.inventoryCountInfo(itemId);

            //애정도 최대치 달성 시 성장도 증가
            int increasedAffinity = 0;
            if(pet.getAffection() + rate + addrate > affectionMax){
                switch (growthType) {
                    case EGG:
                        growthType = GrowthType.BABY;
                        increasedAffinity= pet.getAffection() + rate + addrate - affectionMax;
                        break;
                    case BABY:
                        growthType = GrowthType.YOUTH;
                        increasedAffinity= pet.getAffection() + rate + addrate - affectionMax;
                        break;
                    default:
                        growthType = GrowthType.ADULT;
                        increasedAffinity= 0;
                        break;
                }
            }else {
                increasedAffinity= pet.getAffection() + rate + addrate;
            }

            try{
                pet.setGrowth(growthType);
                pet.setAffection(increasedAffinity);
                petRepository.save(pet);
                response.put("success", true);
                response.put("message", SuccessCode.UPDATE_SUCCESS);
            }catch(Exception e) {
                response.put("success", false);
                response.put("message", ErrorCode.UPDATE_ERROR);
                e.printStackTrace();
            }
        }

        return response;
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

    /*펫 상세 조회*/
    public PetDTO getPetDetail(Integer petId) {
        // 펫 정보
        Pet pet = petRepository.findById(petId)
                .orElseThrow(()->new BusinessException(ErrorCode.PET_NOT_EXIST,ErrorCode.PET_NOT_EXIST.getMessage()));

        return PetDTO.of(pet);
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
        User petOwner = userRepository.findByUserIdAndDeletedAtIsNull(pet.getUser().getUserId())
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));
        if(!petOwner.equals(user)) {
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
        User petOwner = userRepository.findByUserIdAndDeletedAtIsNull(pet.getUser().getUserId())
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));
        if(!petOwner.equals(user)) {
            throw new BusinessException(ErrorCode.PET_ACCESS_DENIED, ErrorCode.PET_ACCESS_DENIED.getMessage());
        }

        petRepository.delete(pet);

        return true;
    }
}
