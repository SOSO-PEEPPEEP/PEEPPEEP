package com.peeppeep.domain.user.main.repository;

import com.peeppeep.domain.user.main.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.peeppeep.domain.user.main.service.UserService;
import org.junit.jupiter.api.Test;
import org.slf4j.*;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
class UserRepositoryTest {

    private Logger LOG = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private UserService userService;

    @Test
    void findUser() {
        String loginId = "testid01";

        Map<String, Object> response = userService.findUser(loginId);
        LOG.info("response: {}", response);

    }

    @Test
    void findId() {
        String name = "테스트이름1번";
        String email= "test01@mail.com";

        Map<String, Object> response = userService.findId(name, email);
        LOG.info("response: {}", response);
    }

    @Test
    void findPw() {
        String loginId = "testid01";
        String nam = "테스트이름1번";
        String email = "aneast5@naver.com";

        Map<String, Object> response = userService.findPw(loginId, nam, email);
        LOG.info("response: {}", response);
    }

    @Test
    void signUP() {
        String loginId = "moditestid01";
        String userPw = "moditestpw01";
        String name = "수정이름1번";
        String nickname = "수정닉네임1번";
        String email = "moditest@@";
        String profilePicture = "수정테스트프로필사진01";
        String comment = "수정테스트코멘트01";
        int mainChallengeId = 501;
        int mainCharacterId = 502;

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("loginId", loginId);
        userInfo.put("userPw", userPw);
        userInfo.put("name", name);
        userInfo.put("nickname", nickname);
        userInfo.put("email", email);
        userInfo.put("profilePicture", profilePicture);
        userInfo.put("comment", comment);
        userInfo.put("mainCharacterId", mainCharacterId);
        userInfo.put("mainChallengeId", mainChallengeId);

        Map<String, Object> response = userService.signUp(userInfo);
        LOG.info("response: {}", response);
    }

    @Test
    void setNewPassword(){
        String loginId = "moditestid01";
        String userPw = "testpw01";

        Map<String, Object> response = userService.setNewPassword(loginId, userPw);
        LOG.info("response: {}", response);
    }

    @Test
    void updateUserInfo(){
        String loginId = "moditestid01";
        String nickname = "테스트변경닉네임01";
        String comment = "테스트변경코멘트01";
        String profilePicture = "테스트변경프로필사진";

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("loginId", loginId);
        userInfo.put("nickname", nickname);
        userInfo.put("comment", comment);
        userInfo.put("profilePicture", profilePicture);

        Map<String, Object> response = userService.updateUserInfo(userInfo);

        LOG.info("response: {}", response);
    }
}