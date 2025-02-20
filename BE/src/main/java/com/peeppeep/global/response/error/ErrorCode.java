package com.peeppeep.global.response.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /**
     * ******************************* Error CodeList ***************************************
     * HTTP Status Code
     * 400 : Bad Request
     * 401 : Unauthorized
     * 403 : Forbidden
     * 404 : Not Found
     * 500 : Internal Server Error
     * ******************************* Global Error CodeList ***************************************
     */
    MISSING_REQUEST_PARAMETER_ERROR(400, "Request Parameter로 데이터가 전달되지 않았습니다."),
    REQUEST_BODY_MISSING_ERROR(400, "@RequestBody 데이터가 누락되었습니다."),
    NOT_VALID_HEADER_ERROR(400, "Header에 데이터가 존재하지 않습니다."),
    JACKSON_PROCESS_ERROR(400, "Jackson 처리 오류 발생했습니다."),
    INVALID_TYPE_VALUE(400, "유효하지 않은 데이터 타입입니다."),
    BAD_REQUEST_ERROR(400, "잘못된 서버 요청입니다."),
    JSON_PARSE_ERROR(400, "JSON 파싱 오류 발생했습니다."),
    NOT_VALID_ERROR(400, "유효하지 않은 요청 데이터입니다."),
    IO_ERROR(400, "입출력 오류가 발생했습니다."),
    FORBIDDEN_ERROR(403, "권한이 없습니다."),
    NOT_FOUND_ERROR(404, "요청한 리소스를 찾을 수 없습니다."),
    NULL_POINT_ERROR(500, "NULL 포인터 예외가 발생했습니다."),
    INTERNAL_SERVER_ERROR(500, "서버 내부 오류가 발생했습니다."),
    /**
     * *********************************************************************************************
     */
    // basic
    INSERT_ERROR(200, "삽입 실패"),
    UPDATE_ERROR(200, "수정 실패"),
    DELETE_ERROR(200, "삭제 실패"),

    /**
     * ******************************* Custom Error CodeList ***************************************
     */

    // User
    FAIL_TO_LOGIN_EMPTY(400, "입력된 정보가 없습니다."),
    FAIL_TO_LOGIN(400, "아이디 또는 비밀번호를 확인해주시기 바랍니다."),
    FAIL_TO_OAUTH_LOGIN(400, "소셜 로그인에 실패했습니다."),
    USER_ID_NOT_EXIST(400, "회원 ID가 존재하지 않습니다."),
    USER_ID_ALREADY_EXIST(400, "회원 ID가 이미 존재합니다."),

    USER_NICKNAME_NOT_EXIST(400, "회원 닉네임이 존재하지 않습니다."),
    NICKNAME_ALREADY_EXIST(400, "닉네임이 이미 존재합니다.");


    /**
     * ******************************* Error Code Field ***************************************
     */

    // 에러 코드의 '코드 상태'을 반환한다.
    private final int status;

    // 에러 코드의 '코드 메시지'을 반환한다.
    private final String message;
}