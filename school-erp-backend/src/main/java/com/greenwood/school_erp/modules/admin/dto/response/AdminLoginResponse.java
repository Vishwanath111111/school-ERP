package com.greenwood.school_erp.modules.admin.dto.response;

public class AdminLoginResponse {

    private boolean success;
    private String message;

    public AdminLoginResponse() {
    }

    public AdminLoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
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
}