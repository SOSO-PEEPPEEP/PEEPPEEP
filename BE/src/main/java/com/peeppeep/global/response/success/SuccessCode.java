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
    MEMBER_UPDATE_SUCCESS(200, "회원정보 수정에 성공하였습니다."),
    MEMBER_DELETE_SUCCESS(200, "회원 탈퇴에 성공하였습니다."),

    VERIFICATION_CODE(200, "회원 정보에 입력된 이메일 주소로 인증번호를 전송하였습니다.")
    ;

    /**
     * ******************************* Success Code Field ***************************************
     */
    // 성공 코드의 '코드 상태'를 반환한다.
    private final int status;

    // 성공 코드의 '코드 메시지'를 반환한다.
    private final String message;
}