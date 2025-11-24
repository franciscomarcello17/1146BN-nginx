package com.example.estoque_service.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estoque_service.domain.estoque.Estoque;

public interface EstoqueJpaRepository extends JpaRepository<Estoque, Long> {
}
