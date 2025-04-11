package com.peeppeep.domain.user.friend.dto.response;

import com.peeppeep.domain.user.main.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FriendResponseDTO {
    private Integer userId;
    private String loginId;
    private String nickname;
    private String profilePicture;
    private String comment;

    @Builder
    public FriendResponseDTO(Integer userId, String loginId, String nickname, String profilePicture, String comment) {
        this.userId = userId;
        this.loginId = loginId;
        this.nickname = nickname;
        this.profilePicture = profilePicture;
        this.comment = comment;
    }

    public static FriendResponseDTO of(User user) {
        return builder()
                .userId(user.getUserId())
                .loginId(user.getLoginId())
                .nickname(user.getNickname())
                .profilePicture(user.getProfilePicture())
                .comment(user.getComment())
                .build();
    }
}
