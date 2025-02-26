package com.peeppeep.domain.user.main.entity;

import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "pw")
    private String userPw;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "email")
    private String email;

    @Column(name="profile_picture")
    private String profilePicture;

    @Column(name = "comment")
    private String comment;

    @Column(name = "main_challenge_id")
    private Integer mainChallengeId;

    @Column(name = "main_character_id")
    private Integer mainCharacterId;

}