package com.peeppeep.domain.user.main.service;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findUserId(String userId, String userPw) {
        return userRepository.findUserId(userId)
                .filter(user -> passwordEncoder.matches(userPw, user.getUserPw()));
    }

    public Map<String, Object> signUp(Map<String, Object> userInfo) {
        Map<String, Object> response = new HashMap<>();

        String userId = (userInfo.get("userId") != null) ? userInfo.get("userId").toString() : "";
        String userPw = (userInfo.get("userPw") != null) ? userInfo.get("userPw").toString() : "";
        String encodePw = passwordEncoder.encode(userPw);
        String nickname = (userInfo.get("nickname") != null) ? userInfo.get("nickname").toString() : "";
        String email = (userInfo.get("email") != null) ? userInfo.get("email").toString() : "";
        String profilePicture = (userInfo.get("profilePicture") != null) ? userInfo.get("profilePicture").toString() : "";
        String comment = (userInfo.get("comment") != null) ? userInfo.get("comment").toString() : "";
        int mainChallengeId = Integer.parseInt(userInfo.get("mainChallengeId").toString());
        int mainCharacterId = Integer.parseInt(userInfo.get("mainCharacterId").toString());

        Optional<User> idCheck = userRepository.findUserId(userId);
        Optional<User> nicknameCheck = userRepository.findUserNickname(nickname);

        if (idCheck.isPresent()) {
            response.put("success", false);
            response.put("message", ErrorCode.USER_ID_ALREADY_EXIST);
            return response;
        }else if (nicknameCheck.isPresent()) {
            response.put("success", false);
            response.put("message", ErrorCode.NICKNAME_ALREADY_EXIST);
            return response;
        }

        User user = User.builder()
                .userId(userId)
                .userPw(encodePw)
                .nickname(nickname)
                .email(email)
                .profilePicture(profilePicture)
                .comment(comment)
                .mainChallengeId(mainChallengeId)
                .mainCharacterId(mainCharacterId)
                .build();
        userRepository.save(user);

        response.put("success", true);
        response.put("message", SuccessCode.REGISTER_SUCCESS);
        return response;
    }

    public Map<String, Object> findId(String userId, String email){
        Map<String, Object> response = new HashMap<>();
        Optional<String> findId = userRepository.findId(userId, email);
        if (findId.isPresent()) {
            response.put("userId", findId.get());
            response.put("success", true);
            response.put("message", SuccessCode.MEMBER_GET_SUCCESS);
        }else {
            response.put("success", false);
            response.put("message", ErrorCode.USER_ID_NOT_EXIST);
        }
        return response;
    }

    public Map<String, Object> findPw(String userId, String name, String email) {
        Map<String, Object> response = new HashMap<>();
        Optional<String> user = userRepository.findPw(userId, name, email);

        if (user.isPresent()) {
            Random code = new Random();
            int randomCode = code.nextInt(1000000);
            String emailCode = String.format("%06d", randomCode);
            // 메일 전송 + Redis



            response.put("success", true);
            response.put("message", SuccessCode.VERIFICATION_CODE);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.USER_INFO_CHECK);
        }
        return response;
    }

    public Map<String, Object> setNewPassword(String userId, String userPw) {
        Map<String, Object> response = new HashMap<>();
        String encodePw = passwordEncoder.encode(userPw);
        int user = userRepository.setNewPassword(userId, encodePw);

        if(user > 0){
            response.put("success", true);
            response.put("message", SuccessCode.MEMBER_UPDATE_SUCCESS);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.UPDATE_ERROR);
        }
        return response;
    }
}
