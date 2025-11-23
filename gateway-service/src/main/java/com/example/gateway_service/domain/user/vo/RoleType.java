package com.example.gateway_service.domain.user.vo;


public enum RoleType {
    USUARIO(1),
    PRODUTOR(2),
    RECRUTADOR(3),
    ADMIN(4);

    private final int level;

    RoleType(int level) {
        this.level = level;
    }

    public boolean covers(RoleType other) {
        return this.level >= other.level;
    }

    public int getLevel() {
        return this.level;
    }
}
