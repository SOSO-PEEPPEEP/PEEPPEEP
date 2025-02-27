package com.peeppeep.domain.user.main.controller;

import com.peeppeep.domain.user.main.service.UserService;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;

@Controller
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(String loginId, String userPw) {
        Map<String, Object> user = userService.findUser(loginId);
        Map<String, Object> response = new HashMap<>();
        if(loginId != null && !loginId.isEmpty() && userPw != null && !userPw.isEmpty()){
            if(!user.isEmpty()) {
                try{
                    Map<String, Object> userInfo = userService.login(loginId, userPw);
                    response.put("userInfo", userInfo);
                    response.put("success", true);
                    response.put("message", SuccessCode.LOGIN_SUCCESS);
                }catch (Exception e){
                    response.put("success", false);
                    response.put("message", ErrorCode.FAIL_TO_LOGIN);
                }
            } else {
                response.put("success", false);
                response.put("message", ErrorCode.FAIL_TO_LOGIN);
            }
        }else{
            response.put("success", false);
            response.put("message", ErrorCode.FAIL_TO_LOGIN_EMPTY);
        }
        return response;
    }

    @RequestMapping(value = "/signUp", method = RequestMethod.POST)
    public Map<String, Object> signUp(Map<String, Object> userInfo) {
        return userService.signUp(userInfo);
    }

    @RequestMapping(value = "/findId", method = RequestMethod.POST)
    public Map<String, Object> findId(String name, String email){
        return userService.findId(name, email);
    }

    @RequestMapping(value = "/findPw", method = RequestMethod.POST)
    public Map<String, Object> findPw(String loginId, String name, String email){
        return userService.findPw(loginId, name, email);
    }

    @RequestMapping(value = "/setNewPassword", method = RequestMethod.POST)
    public Map<String, Object> setNewPassword(String loginId, String userPw) {
        return userService.setNewPassword(loginId, userPw);
    }

    @RequestMapping(value = "/updateUserInfo", method = RequestMethod.PUT)
    public Map<String, Object> updateUserInfo(Map<String, Object> userInfo) {
        return userService.updateUserInfo(userInfo);
    }

}
