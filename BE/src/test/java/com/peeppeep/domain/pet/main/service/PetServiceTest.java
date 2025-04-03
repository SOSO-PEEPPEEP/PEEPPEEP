package com.peeppeep.domain.pet.main.service;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;


@SpringBootTest
class PetServiceTest {

    private Logger LOG = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private PetService petService;

    @Test
    void interaction() {
        int userId = 1;
        int petId = 1;
        int itemId = 1;
        int colId = 1;

        Map<String, Object> response = petService.Interaction(userId, petId, itemId, colId);

        LOG.info("response: {}", response);
    }
}