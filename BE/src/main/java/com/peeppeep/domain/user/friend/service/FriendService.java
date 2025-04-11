package com.peeppeep.domain.user.friend.service;

import com.peeppeep.domain.user.friend.dto.response.FriendResponseDTO;
import com.peeppeep.domain.user.friend.entity.Friend;
import com.peeppeep.domain.user.friend.repository.FriendRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    public List<FriendResponseDTO> findUserFriendInfo(int userId, String status, int req) {
        // User 정보
        userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(()->new BusinessException(ErrorCode.USER_ID_NOT_EXIST, ErrorCode.USER_ID_NOT_EXIST.getMessage()));

        // 친구 총 정보
        List<User> friends = friendRepository.findUserFriendInfo(userId, status);

        if(status.equals("ACCEPTED")) {
            List<User> acceptedFriends = new ArrayList<>();
            for (User friend : friends) {
                if (friend.getUserId() != userId) {
                    acceptedFriends.add(friend);
                }
            }
            return acceptedFriends.stream()
                    .map(FriendResponseDTO::of)
                    .collect(Collectors.toList());
        }
        else{
            List<User> pendingFriends = new ArrayList<>();
            if(status.equals("PENDING") && req == 1) { //받은 요청 버튼 req= 0, 보낸 요청 버튼 req= 1
                for (User friend : friends) {
                    if (friend.getUserId() != userId) {
                        pendingFriends.add(friend);
                    }
                }
            }
            else {
                for (User friend : friends) {
                    if (friend.getUserId() == userId) {
                        pendingFriends.add(friend);
                    }
                }
            }

            return pendingFriends.stream()
                    .map(FriendResponseDTO::of)
                    .collect(Collectors.toList());
        }
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
