package com.peeppeep.domain.user.main.controller;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.service.UserService;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;

@Controller
public class UserController {

    private final UserService userService;
    private ErrorCode errorCode;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(String userId, String userPw) {
        Optional<User> user = userService.findUserId(userId, userPw);
        Map<String, Object> response = new HashMap<>();
        if(userId != null && !userId.isEmpty() && userPw != null && !userPw.isEmpty()){
            if(user.isPresent()) { // 성공
                response.put("success", true);
                response.put("message", SuccessCode.LOGIN_SUCCESS);
            } else { //실패
                response.put("success", false);
                response.put("message", errorCode.FAIL_TO_LOGIN);
            }
        }else{
            response.put("success", false);
            response.put("message", errorCode.FAIL_TO_LOGIN_EMPTY);
        }
        return response;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public Map<String, Object> signUp(Map<String, Object> userInfo) {
        return userService.signUp(userInfo);
    }

    @RequestMapping(value = "/findId", method = RequestMethod.POST)
    public Map<String, Object> findId(String name, String email){
        return userService.findId(name, email);
    }

    @RequestMapping(value = "/findPw", method = RequestMethod.POST)
    public Map<String, Object> findPw(String userId, String name, String email){
        return userService.findPw(userId, name, email);
    }

    @RequestMapping(value = "/setNewPassword", method = RequestMethod.POST)
    public Map<String, Object> setNewPassword(String userId, String userPw) {
        return userService.setNewPassword(userId, userPw);
    }

}
