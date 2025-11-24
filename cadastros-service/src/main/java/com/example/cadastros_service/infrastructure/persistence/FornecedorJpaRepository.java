package com.example.cadastros_service.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cadastros_service.domain.fornecedor.Fornecedor;

public interface FornecedorJpaRepository extends JpaRepository<Fornecedor, Long> {}
