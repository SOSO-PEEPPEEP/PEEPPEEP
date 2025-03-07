package com.peeppeep.domain.pet.main.service;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.collection.entity.PetType;
import com.peeppeep.domain.pet.collection.repository.PetCollectionRepository;
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
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PetService {

    private final InventoryRepository inventoryRepository;
    private final PetRepository petRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final PetCollectionRepository petCollectionRepository;

    public PetService(InventoryRepository inventoryRepository, PetRepository petRepository, ItemRepository itemRepository, UserRepository userRepository, PetCollectionRepository petCollectionRepository) {
        this.inventoryRepository = inventoryRepository;
        this.petRepository = petRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.petCollectionRepository = petCollectionRepository;
    }

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
            if(petType.getPetTypeId() == item.getPetTypeId().getPetTypeId()) {
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
}
