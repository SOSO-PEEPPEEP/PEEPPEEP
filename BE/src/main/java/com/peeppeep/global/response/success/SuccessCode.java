package com.peeppeep.global.response.success;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    /**
     * ******************************* Success CodeList ***************************************
     * common HTTP Status Code
     * 200 : OK                 성공
     * 201 : Created            생성됨
     * 202 : Accepted           허용됨
     * -------------------
     * other HTTP Status Code
     * 204 : No Content         콘텐츠 없음
     * 206 : Partial Content    일부 콘텐츠
     * *********************************************************************************************
     */
    // basic
    INSERT_SUCCESS(201, "삽입 성공"),
    SELECT_SUCCESS(200, "조회 성공"),
    UPDATE_SUCCESS(204, "수정 성공"),
    DELETE_SUCCESS(204, "삭제 성공"),

    /**
     * ******************************* Custom Success CodeList ***************************************
     */
    // Member
    REGISTER_SUCCESS(201, "회원가입에 성공하였습니다."),
    LOGIN_SUCCESS(200, "로그인에 성공하였습니다."),
    LOGOUT_SUCCESS(200, "로그아웃에 성공하였습니다."),
    MEMBER_ID_EXIST(200, "회원 id가 이미 존재합니다."),
    MEMBER_ID_NOT_EXIST(200, "회원 id가 존재하지 않습니다."),
    MEMBER_GET_SUCCESS(200, "회원정보 조회에 성공하였습니다."),
    MEMBER_UPDATE_SUCCESS(204, "회원정보 수정에 성공하였습니다."),
    MEMBER_UPDATE_PASSWORD(204, "회원 비밀번호 변경에 성공하였습니다."),
    MEMBER_DELETE_SUCCESS(204, "회원 탈퇴에 성공하였습니다."),

    SEND_VERIFICATION_CODE(200, "회원 정보에 입력된 이메일 주소로 인증번호를 전송하였습니다."),
    VERIFICATION_CODE(200, "인증에 성공하였습니다."),

    //Friends
    FRIENDS_LIST_GET_SUCCESS(200, "친구 목록 조회에 성공하였습니다."),
    FRIENDS_STATUS_UPDATE_SUCCESS(204, "친구 관계 변경에 성공하였습니다."),
    FRIENDS_DEACTIVATE_FRIENDSHIP_SUCCESS(204, "친구 삭제에 성공하였습니다."),

    // Challenge
    CHALLENGE_CREATE_SUCCESS(201, "챌린지 생성에 성공하였습니다."),
    CHALLENGE_GET_SUCCESS(200, "챌린지 조회에 성공하였습니다."),
    CHALLENGE_UPDATE_SUCCESS(204, "챌린지 수정에 성공하였습니다."),
    CHALLENGE_DELETE_SUCCESS(204, "챌린지 삭제에 성공하였습니다."),
    CHALLENGE_RESULT_SUCCESS(200, "챌린지 결산에 성공하였습니다."),

    // Daily
    DAILY_CREATE_SUCCESS(201, "챌린지 데일리 생성에 성공하였습니다."),
    DAILY_DELETE_SUCCESS(204, "챌린지 데일리 삭제에 성공하였습니다."),

    // Pet
    PET_CREATE_SUCCESS(201, "펫 생성에 성공하였습니다."),
    PET_GET_SUCCESS(200,"펫 조회에 성공하였습니다."),
    PET_COLLECTION_GET_SUCCESS(200, "펫 도감 조회에 성공하였습니다."),
    PET_UPDATE_SUCCESS(204, "펫 정보 수정에 성공하였습니다."),
    PET_DELETE_SUCCESS(204, "펫 삭제에 성공하였습니다."),

    ;

    /**
     * ******************************* Success Code Field ***************************************
     */
    // 성공 코드의 '코드 상태'를 반환한다.
    private final int status;

    // 성공 코드의 '코드 메시지'를 반환한다.
    private final String message;
}