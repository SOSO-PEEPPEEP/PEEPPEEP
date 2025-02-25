package com.peeppeep.domain.user.friend.controller;

import com.peeppeep.domain.user.friend.service.UserFriendService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
public class UserFriendController {

    private final UserFriendService userFriendService;

    public UserFriendController(UserFriendService userFriendService) {
        this.userFriendService = userFriendService;
    }

    @RequestMapping(value = "/getFriendsList", method = RequestMethod.GET)
    public Map<String, Object> getFriendsList(String userId, String status) {
        return userFriendService.findUserFriend(userId, status) ;
    }

    @RequestMapping(value = "/setFriendsStatus", method = RequestMethod.PUT)
    public Map<String, Object> setFriendsStatus(String userId, String status) {
        return userFriendService.setFriendsStatus(userId, status);
    }

    @RequestMapping(value = "/deactivateFriendship", method = RequestMethod.PUT)
    public Map<String, Object> deactivateFriendship(String userId, String status) {
        return userFriendService.deactivateFriendship(userId, status);
    }

}
