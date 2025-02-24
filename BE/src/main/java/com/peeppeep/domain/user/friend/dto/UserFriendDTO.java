package com.peeppeep.domain.user.friend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserFriendDTO {
    private String id;
    private String sender_id;
    private String receiver_id;
    private String status;
}
