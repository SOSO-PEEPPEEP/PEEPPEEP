package com.peeppeep.global.response.success;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ApiResponse<T> {
    private final int status;

    private final String message;

    private final T data;

    @Builder
    private ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> of(SuccessCode resultCode, T data) {
        return ApiResponse.<T>builder()
                .status(resultCode.getStatus())
                .message(resultCode.getMessage())
                .data(data)
                .build();
    }

    public static ApiResponse<Void> of(SuccessCode resultCode) {
        return ApiResponse.<Void>builder()
                .status(resultCode.getStatus())
                .message(resultCode.getMessage())
                .build();
    }

}