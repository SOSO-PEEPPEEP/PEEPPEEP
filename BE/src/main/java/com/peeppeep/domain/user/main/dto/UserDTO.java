package com.peeppeep.domain.user.main.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String id;
    private String pw;
    private String nickname;
    private String email;
    private String profile_picture;
    private String comment;
    private int main_challenge_id;
    private int main_character_id;
}
