package com.example.stuuse.dao.entity;

public class AuthenticationResponse {
    private final String jwt;
    private final Long userId;
    private final String typeOfUser;

    public AuthenticationResponse(String jwt, Long userId, String typeOfUser) {
        this.jwt = jwt;
        this.userId = userId;
        this.typeOfUser = typeOfUser;
    }

    public String getJwt() {
        return jwt;
    }

    public Long getUserId() {
        return userId;
    }

    public String getTypeOfUser() {
        return typeOfUser;
    }
}