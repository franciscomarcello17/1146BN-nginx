package com.example.gateway_service.infrastructure.security;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.gateway_service.domain.user.vo.RoleType;

import reactor.core.publisher.Mono;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1) // Executa depois do CORS
public class AuthorizationFilter implements WebFilter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    // ROTAS E PERMISSÕES CORRIGIDAS
    private static final Map<String, RoleType> routeRoles = Map.of(
        "/demo1/waiter", RoleType.MANAGER,
        "/demo1/customer", RoleType.USER
    );

    private boolean isAuthorized(String path, RoleType role) {
        for (Map.Entry<String, RoleType> entry : routeRoles.entrySet()) {
            if (path.startsWith(entry.getKey())) {
                return role.covers(entry.getValue());
            }
        }
        return false;
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

@Override
public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();

    // ⚠️ IGNORA COMPLETAMENTE REQUISIÇÕES OPTIONS (CORS PRE-FLIGHT)
    if (request.getMethod().name().equals("OPTIONS")) {
        return chain.filter(exchange);
    }

    String path = request.getPath().toString();

    // Rota não protegida → segue
    if (routeRoles.entrySet().stream().noneMatch(entry -> path.startsWith(entry.getKey()))) {
        return chain.filter(exchange);
    }

    // Restante do código de verificação do token...
    String authHeader = request.getHeaders().getFirst("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return unauthorized(exchange);
    }

    String token = authHeader.substring(7);
    DecodedJWT jwt;
    try {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes(StandardCharsets.UTF_8));
        JWTVerifier verifier = JWT.require(algorithm).build();
        jwt = verifier.verify(token);
    } catch (Exception e) {
        return unauthorized(exchange);
    }

    String tokenType = jwt.getClaim("type").asString();
    if (!"access".equals(tokenType)) {
        return unauthorized(exchange);
    }

    String userRoleType = jwt.getClaim("role").asString();
    RoleType role;
    try {
        role = RoleType.valueOf(userRoleType);
    } catch (Exception e) {
        return unauthorized(exchange);
    }

    if (!isAuthorized(path, role)) {
        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
        return exchange.getResponse().setComplete();
    }

    return chain.filter(exchange);
}
}
