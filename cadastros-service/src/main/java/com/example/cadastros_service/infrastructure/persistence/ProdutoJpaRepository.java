package com.example.cadastros_service.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cadastros_service.domain.produto.Produto;

public interface ProdutoJpaRepository extends JpaRepository<Produto, Long> {}
