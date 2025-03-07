package com.peeppeep.domain.user.friend.controller;

import com.peeppeep.domain.user.friend.service.FriendService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
public class FriendController {

    private final FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @RequestMapping(value = "/getFriendsList", method = RequestMethod.GET)
    public Map<String, Object> getFriendsList(int userId, String status, int req) {
        return friendService.findUserFriendInfo(userId, status, req);
    }

    @RequestMapping(value = "/setFriendsStatus", method = RequestMethod.PUT)
    public Map<String, Object> setFriendsStatus(int userId, String status, String newStatus) {
        return friendService.setFriendsStatus(userId, status, newStatus);
    }
}
