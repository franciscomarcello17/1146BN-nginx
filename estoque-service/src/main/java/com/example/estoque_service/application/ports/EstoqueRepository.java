package com.example.estoque_service.application.ports;

import com.example.estoque_service.domain.estoque.Estoque;

public interface EstoqueRepository {
    Estoque findByProdutoId(Long produtoId);
    Estoque save(Estoque estoque);
}
