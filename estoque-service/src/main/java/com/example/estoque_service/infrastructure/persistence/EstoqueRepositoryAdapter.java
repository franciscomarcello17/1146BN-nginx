package com.example.estoque_service.infrastructure.persistence;

import org.springframework.stereotype.Component;

import com.example.estoque_service.application.ports.EstoqueRepository;
import com.example.estoque_service.domain.estoque.Estoque;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EstoqueRepositoryAdapter implements EstoqueRepository {

    private final EstoqueJpaRepository jpa;

    @Override
    public Estoque findByProdutoId(Long produtoId) {
        return jpa.findById(produtoId).orElse(null);
    }

    @Override
    public Estoque save(Estoque estoque) {
        return jpa.save(estoque);
    }
}
