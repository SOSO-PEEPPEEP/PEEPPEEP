package com.peeppeep.domain.user.friend.controller;

import com.peeppeep.domain.user.friend.dto.response.FriendResponseDTO;
import com.peeppeep.domain.user.friend.service.FriendService;
import com.peeppeep.global.response.success.ApiResponse;
import com.peeppeep.global.response.success.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @GetMapping("")
    public ApiResponse<List<FriendResponseDTO>> getFriendsList(int userId, String status, int req) {
        return ApiResponse.of(SuccessCode.FRIENDS_LIST_GET_SUCCESS,friendService.findUserFriendInfo(userId, status, req));
    }

    @PostMapping(value = "")
    public Map<String, Object> setFriendsStatus(int userId, String status, String newStatus) {
        return friendService.setFriendsStatus(userId, status, newStatus);
    }
}
