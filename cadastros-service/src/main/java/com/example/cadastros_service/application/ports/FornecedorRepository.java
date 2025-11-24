package com.example.cadastros_service.application.ports;

import java.util.List;

import com.example.cadastros_service.domain.fornecedor.Fornecedor;

public interface FornecedorRepository {
    Fornecedor save(Fornecedor f);
    List<Fornecedor> findAll();
    Fornecedor findById(Long id);
    void delete(Long id);
}
