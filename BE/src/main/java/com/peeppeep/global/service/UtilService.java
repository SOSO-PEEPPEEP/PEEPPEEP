package com.peeppeep.global.service;

import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UtilService {

    public Map<String, Object> verifycode (String verificationCode, String enteredCode) {
        Map<String, Object> response = new HashMap<>();

        if(verificationCode.equals(enteredCode)) {
            response.put("success", true);
            response.put("message", SuccessCode.VERIFICATION_CODE);
        }else{
            response.put("success", false);
            response.put("message", ErrorCode.VERIFY_ERROR);
        }
        return response;
    }

}
