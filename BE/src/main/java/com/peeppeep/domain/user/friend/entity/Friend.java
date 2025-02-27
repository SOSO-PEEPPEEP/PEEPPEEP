package com.peeppeep.domain.user.friend.entity;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Friend extends BaseBy {
    @Id
    @Column(name = "friend_id")
    private Integer friendId;

    @JoinColumn(name = "sender_id")
    private Integer senderId;

    @JoinColumn(name = "receiver_id")
    private Integer receiverId;

    @Column(name = "status")
    private String status;


}
