package com.peeppeep.global.service;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UtilServiceTest {

    private Logger LOG = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private UtilService utilService;

    @Test
    void verifycode() {
        String verificationCode = "676767" ;
        String  enteredCod = "676767" ;

        Map<String, Object> response = utilService.verifycode(verificationCode, enteredCod);
        LOG.info("response: {}", response);
    }
}