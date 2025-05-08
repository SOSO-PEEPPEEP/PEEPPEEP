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
    INSERT_ERROR(400, "삽입 실패"),
    UPDATE_ERROR(400, "수정 실패"),
    DELETE_ERROR(404, "삭제 실패"),
    READ_ERROR(404, "조회 실패"),
    VERIFY_ERROR(404, "인증 실패"),
    /**
     * ******************************* Custom Error CodeList ***************************************
     */
    // S3
    S3_SAVE_ERROR(400, "S3에 파일 저장에 실패하였습니다."),
    S3_DELETE_ERROR(400, "S3에 파일 삭제에 실패하였습니다."),
    FILE_FORMAT_NOT_EXIST(400, "존재하지 않은 형식의 파일입니다"),

    // User
    FAIL_TO_LOGIN_EMPTY(400, "입력된 정보가 없습니다."),
    FAIL_TO_LOGIN(400, "아이디 또는 비밀번호를 확인해주시기 바랍니다."),
    FAIL_TO_OAUTH_LOGIN(400, "소셜 로그인에 실패했습니다."),
    USER_ID_NOT_EXIST(400, "회원 ID가 존재하지 않습니다."),
    USER_ID_ALREADY_EXIST(400, "회원 ID가 이미 존재합니다."),
    USER_INFO_CHECK(400, "입력하신 회원 정보를 확인해주시기 바랍니다."),

    USER_NICKNAME_NOT_EXIST(404, "회원 닉네임이 존재하지 않습니다."),
    NICKNAME_ALREADY_EXIST(400, "닉네임이 이미 존재합니다."),

    // Challenge
    CHALLENGE_NOT_EXIST(400,"챌린지가 존재하지 않습니다."),
    CATEGORY_NOT_EXIST(400,"카테고리가 존재하지 않습니다."),
    CHALLENGE_ACCESS_DENIED(403, "해당 챌린지에 접근할 수 없습니다."),
    CHALLENGE_USER_NOT_EXIST(400,"챌린지 유저가 존재하지 않습니다."),
    CHALLENGE_NOT_COMPLETE(400, "챌린지 결산에 해당되지 않습니다."),

    // Daily
    DAY_FIELD_NOT_EXIST(400, "day 필드명이 존재하지 않습니다."),
    DAILY_NOT_EXIST(400, "챌린지 데일리가 존재하지 않습니다."),

    // Calendar
    CALENDAR_NOT_FOUND(400, "챌린지 캘린더가 존재하지 않습니다."),

    // Pet
    PET_TYPE_NOT_EXIST(400, "펫 타입이 존재하지 않습니다."),
    PET_COLLECTION_NOT_FOUND(404,"펫 도감에 해당 펫을 찾을 수 없습니다."),
    PET_RANK_NOT_FOUND(400,"펫 도감에 해당 랭크의 펫을 찾을 수 없습니다."),
    PET_NOT_EXIST(400, "펫이 존재하지 않습니다"),
    PET_ACCESS_DENIED(403, "해당 펫에 접근할 수 없습니다."),

    // Item
    ITEM_NOT_FOUND(400, "아이템이 존재하지 않습니다."),
    INVENTORY_NOT_FOUND(400, "인벤토리에 해당 아이템이 존재하지 않습니다."),

    ;
    /**
     * ******************************* Error Code Field ***************************************
     */

    // 에러 코드의 '코드 상태'을 반환한다.
    private final int status;

    // 에러 코드의 '코드 메시지'을 반환한다.
    private final String message;
}