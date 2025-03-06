package com.peeppeep.domain.pet.main.service;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetType;
import com.peeppeep.domain.pet.collection.entity.PetRankType;
import com.peeppeep.domain.pet.collection.repository.PetCollectionRepository;
import com.peeppeep.domain.pet.collection.repository.PetTypeRepository;
import com.peeppeep.domain.pet.main.dto.PetDTO;
import com.peeppeep.domain.pet.main.dto.request.PetRequestDTO;
import com.peeppeep.domain.pet.main.dto.response.PetListResponseDTO;
import com.peeppeep.domain.pet.main.entity.Pet;
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
