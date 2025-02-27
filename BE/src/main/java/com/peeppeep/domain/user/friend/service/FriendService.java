package com.peeppeep.domain.user.friend.service;

import com.peeppeep.domain.user.friend.entity.Friend;
import com.peeppeep.domain.user.friend.repository.FriendRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.success.SuccessCode;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FriendService {

    private final FriendRepository friendRepository;

    public FriendService(FriendRepository friendRepository, UserRepository userRepository) {
        this.friendRepository = friendRepository;
    }

    public Map<String, Object> findUserFriendInfo(int userId, String status, int req) {
        Map<String, Object> response = new LinkedHashMap<>();
        List<User> friendList = friendRepository.findUserFriendInfo(userId, status);

        if (friendList.size() > 0) {
            if(status.equals("ACCEPTED")) {
                for(int i = 0; i < friendList.size(); i++ ){
                    if(friendList.get(i).getUserId() != userId) {
                        response.put("userInfo [" + (i + 1) + "]", friendList.get(i));
                    }
                }
                response.put("status", "ACCEPTED");
            }else if(status.equals("PENDING") && req == 1) { //받은 요청 버튼 req= 0, 보낸 요청 버튼 req= 1
                for(int i = 0; i < friendList.size(); i++ ){
                    if(friendList.get(i).getUserId() != userId){
                        response.put("userInfo [" + (i + 1) + "]", friendList.get(i));
                        response.put("status", "RECEIVER PENDING");
                    }
                }
            }else if(status.equals("PENDING")) {
                for(int i = 0; i < friendList.size(); i++ ){
                    if(friendList.get(i).getUserId() == userId){
                        response.put("userInfo [" + (i + 1) + "]", friendList.get(i));
                        response.put("status", "SENDER PENDING");
                    }
                }
            }
            response.put("success", true);
            response.put("message", SuccessCode.FRIENDS_LIST_GET_SUCCESS);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.READ_ERROR);
        }
        return response;
    }

    public Map<String, Object> setFriendsStatus(int userId, String status, String newStatus) {
        Map<String, Object> response = new HashMap<>();
        Optional<Friend> requestFriendship = friendRepository.requestFriendship(userId, status);

        if (requestFriendship.isPresent()) {
            response.put("requestFriendship", requestFriendship);

            Friend friend = requestFriendship.get();
            friend.setStatus(newStatus);

            friendRepository.save(friend);

            response.put("success", true);
            response.put("message", SuccessCode.FRIENDS_STATUS_UPDATE_SUCCESS);
        } else {
            response.put("success", false);
            response.put("message", ErrorCode.UPDATE_ERROR);
        }
        return response;
    }
}
