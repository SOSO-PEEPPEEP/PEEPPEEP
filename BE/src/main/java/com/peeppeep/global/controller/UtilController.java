package com.peeppeep.global.controller;

import com.peeppeep.global.service.UtilService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class UtilController {

    private final UtilService utilService;

    public UtilController(UtilService utilService) {
        this.utilService = utilService;
    }

    @RequestMapping(value = "/veryfyCode")
    public Map<String, Object> verifycode (String verificationCode, String enteredCode) {
        return utilService.verifycode(verificationCode, enteredCode);
    }
}
