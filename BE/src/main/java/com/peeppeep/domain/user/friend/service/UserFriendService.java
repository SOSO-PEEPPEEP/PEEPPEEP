package com.peeppeep.domain.user.friend.service;

import com.peeppeep.domain.user.friend.entity.UserFriend;
import com.peeppeep.domain.user.friend.repository.UserFriendRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserFriendService {

    private final UserFriendRepository userFriendRepository;

    public UserFriendService(UserFriendRepository userFriendRepository) {
        this.userFriendRepository = userFriendRepository;
    }

    public Map<String, Object> findUserFriend(String userId, String status) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> friendList = userFriendRepository.findUserFriend(userId, status);
        if (friendList.isPresent()) {
            response.put("userInfo", friendList.get());
            response.put("success", true);
            response.put("message", SuccessCode.FRIENDS_LIST_GET_SUCCESS);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.READ_ERROR);
        }
        return response;
    }

    public Map<String, Object> setFriendsStatus(String userId, String status) {
        Map<String, Object> response = new HashMap<>();
        Optional<UserFriend> requestFriendship = userFriendRepository.requestFriendship(userId, status);

        if (requestFriendship.isPresent() && requestFriendship.get().getReceiverId().equals(userId)) {
            response.put("requestFriendship", requestFriendship);
            UserFriend userFriend = UserFriend.builder()
                    .status(status)
                    .build();
            userFriendRepository.saveUserFriend(userFriend);

            response.put("success", true);
            response.put("message", SuccessCode.FRIENDS_STATUS_UPDATE_SUCCESS);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.UPDATE_ERROR);
        }
        return response;
    }

    public Map<String, Object> deactivateFriendship(String userId, String status) {
        Map<String, Object> response = new HashMap<>();
        Optional<UserFriend> deactivateFriendship = userFriendRepository.requestFriendship(userId, status);

        if(deactivateFriendship.isPresent() && deactivateFriendship.get().getStatus().equals("ACCEPTED")) {
            userFriendRepository.deactivateFriendship(userId, status);

            response.put("deactivateFriendship", deactivateFriendship);
            response.put("success", true);
            response.put("message", SuccessCode.FRIENDS_DEACTIVATE_FRIENDSHIP_SUCCESS);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.DELETE_ERROR);
        }
        return response;
    }
}
