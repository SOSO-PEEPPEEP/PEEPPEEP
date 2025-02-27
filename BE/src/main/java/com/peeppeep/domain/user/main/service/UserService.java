package com.peeppeep.domain.user.main.service;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.success.SuccessCode;
import com.peeppeep.global.util.SendEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SendEmail sendEmail;
    private com.peeppeep.global.util.Util Util;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, SendEmail sendEmail) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.sendEmail = sendEmail;
    }

    public Map<String, Object> findUser(String loginId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> idCheck = userRepository.findUser(loginId);
        if (idCheck.isPresent()) {
            Optional<User> userInfo = userRepository.findUser(loginId);
            response.put("userInfo", userInfo.get());
        }
        return response;
    }

    public Map<String, Object> signUp(Map<String, Object> userInfo) {
        Map<String, Object> response = new HashMap<>();

        String loginId = (userInfo.get("loginId") != null) ? userInfo.get("loginId").toString() : "";
        String userPw = (userInfo.get("userPw") != null) ? userInfo.get("userPw").toString() : "";
        String encodePw = passwordEncoder.encode(userPw);
        String name = (userInfo.get("name") != null) ? userInfo.get("name").toString() : "";
        String nickname = (userInfo.get("nickname") != null) ? userInfo.get("nickname").toString() : "";
        String email = (userInfo.get("email") != null) ? userInfo.get("email").toString() : "";
        String profilePicture = (userInfo.get("profilePicture") != null) ? userInfo.get("profilePicture").toString() : "";
        String comment = (userInfo.get("comment") != null) ? userInfo.get("comment").toString() : "";
        int mainChallengeId = Integer.parseInt(userInfo.get("mainChallengeId").toString());
        int mainCharacterId = Integer.parseInt(userInfo.get("mainCharacterId").toString());

        Optional<User> idCheck = userRepository.findUser(loginId);

        if (idCheck.isPresent()) {
            response.put("success", false);
            response.put("message", ErrorCode.USER_ID_ALREADY_EXIST);
            return response;
        }

        User user = User.builder()
                .loginId(loginId)
                .userPw(encodePw)
                .name(name)
                .nickname(nickname)
                .email(email)
                .profilePicture(profilePicture)
                .comment(comment)
                .mainChallengeId(mainChallengeId)
                .mainCharacterId(mainCharacterId)
                .build();
        try{
            userRepository.save(user);
            response.put("success", true);
            response.put("message", SuccessCode.REGISTER_SUCCESS);
            response.put("userInfo", user);
        }catch (Exception e){
            response.put("success", false);
            response.put("message", ErrorCode.UPDATE_ERROR);
        }

        return response;
    }

    public Map<String, Object> findId(String name, String email){
        Map<String, Object> response = new HashMap<>();
        Optional<String> findId = userRepository.findId(name, email);
        if (findId.isPresent()) {
            response.put("loginId", findId.get());
            response.put("success", true);
            response.put("message", SuccessCode.MEMBER_GET_SUCCESS);
        }else {
            response.put("success", false);
            response.put("message", ErrorCode.USER_ID_NOT_EXIST);
        }
        return response;
    }

    public Map<String, Object> findPw(String loginId, String name, String email) {
        Map<String, Object> response = new HashMap<>();
        Optional<String> user = userRepository.findPw(loginId, name, email);

        if (user.isPresent()) {
            String verificationCode  = Util.getRandomStr();

            /* 이메일 제목 */
            String subject = "PEEP 계정 및 비밀번호 찾기";
            /* 이메일 내용 */
            String text = "인증번호는" + verificationCode + "입니다.";

            try{
                sendEmail.sendEmail(email, subject, text);

                response.put("success", true);
                response.put("message", SuccessCode.SEND_VERIFICATION_CODE);
            }catch (Exception e){
                e.printStackTrace();
                response.put("success", false);
                response.put("message", e.getMessage());
            }
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.USER_INFO_CHECK);
        }
        return response;
    }

    public Map<String, Object> setNewPassword(String loginId, String userPw) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> idCheck = userRepository.findUser(loginId);

        String encodePw = passwordEncoder.encode(userPw);

        if(idCheck.isPresent()) {
            User user = idCheck.get();
            user.setUserPw(encodePw);

            userRepository.save(user);
            response.put("success", true);
            response.put("message", SuccessCode.MEMBER_UPDATE_PASSWORD);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.UPDATE_ERROR);
        }
        return response;
    }

    public Map<String, Object> updateUserInfo(Map<String, Object> userInfo) {
        Map<String , Object> response = new HashMap<>();
        String loginId = userInfo.get("loginId").toString();
        String nickname = userInfo.get("nickname").toString();
        String comment = userInfo.get("comment").toString();
        String profilePicture = userInfo.get("profilePicture").toString();

        Optional<User> idCheck = userRepository.findUser(loginId);

        if(idCheck.isPresent()) {
            User user = idCheck.get();
            user.setNickname(nickname);
            user.setComment(comment);
            user.setProfilePicture(profilePicture);

            userRepository.save(user);
            response.put("success", true);
            response.put("message", SuccessCode.MEMBER_UPDATE_SUCCESS);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.UPDATE_ERROR);
        }
        return response;
    }

}
