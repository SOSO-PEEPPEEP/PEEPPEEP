package com.peeppeep.domain.user.friend.repository;

import com.peeppeep.domain.user.friend.dto.response.FriendResponseDTO;
import com.peeppeep.domain.user.friend.service.FriendService;
import com.peeppeep.global.response.success.ApiResponse;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FriendRepositoryTest {

    private Logger LOG = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private FriendService friendService;
    private FriendRepository friendRepository;

    @Test
    void findUserFriendInfo() {
        int loginId = 4;
        String status = "PENDING";
        int req = 0; //받은 요청 버튼 req= 0, 보낸 요청 버튼 req= 1
//        String status = "ACCEPTED";

        List<FriendResponseDTO> response = friendService.findUserFriendInfo(loginId, status, req);
        LOG.info("response: {}", response);
    }

    @Test
    void requestFriendship() {
        int userId = 1;
        String status = "PENDING" ;
        String newStatus = "REJECTED" ;

        Map<String, Object> response = friendService.setFriendsStatus(userId, status, newStatus);
        LOG.info("response: {}", response);
    }

}