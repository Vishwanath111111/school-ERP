package com.greenwood.school_erp.modules.authentication.dto.response;

public class LoginResponse {

    private boolean success;
    private String message;
    private LoginUserResponse data;

    public LoginResponse() {
    }

    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public LoginResponse(boolean success, String message, LoginUserResponse data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LoginUserResponse getData() {
        return data;
    }

    public void setData(LoginUserResponse data) {
        this.data = data;
    }
}