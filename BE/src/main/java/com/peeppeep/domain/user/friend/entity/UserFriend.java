package com.peeppeep.domain.user.friend.entity;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserFriend extends BaseBy {
    @Id
    @Column(name = "id")
    private int userId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User senderId;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiverId;

    @Column(name = "status")
    private String status;

    public String getSenderId() {
        return String.valueOf(senderId.getUserId());
    }

    public String getReceiverId() {
        return String.valueOf(receiverId.getUserId());
    }

}
