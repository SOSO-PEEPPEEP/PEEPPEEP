package com.peeppeep.domain.user.main.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class User {
    @Id
    @Column(name = "id")
    private String userId;

    @Column(name = "pw")
    private String userPw;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "email")
    private String email;

    @Column(name="profile_picture")
    private String profilePicture;

    @Column(name = "comment")
    private String comment;

    @Column(name = "main_challenge_id")
    private int mainChallengeId;

    @Column(name = "main_character_id")
    private int mainCharacterId;
}
