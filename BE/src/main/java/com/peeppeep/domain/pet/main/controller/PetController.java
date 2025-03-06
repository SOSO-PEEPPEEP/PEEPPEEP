package com.peeppeep.domain.pet.main.controller;

import com.peeppeep.domain.pet.main.service.PetService;
import com.peeppeep.global.response.success.ApiResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class PetController {

    private final PetService petService;

    public PetController(PetService characterService) {
        this.petService = characterService;
    }

    @RequestMapping(value = "/{pet-id}", method = RequestMethod.PUT)
    public Map<String, Object> Interaction(HttpSession session, @PathVariable("pet-id") Integer petId, @RequestParam("itemId") Integer itemId, @RequestParam("petCollectionId") Integer colId) {
        int userId = (int) session.getAttribute("userId");
        return petService.Interaction(userId, petId, itemId, colId);
    }
}
