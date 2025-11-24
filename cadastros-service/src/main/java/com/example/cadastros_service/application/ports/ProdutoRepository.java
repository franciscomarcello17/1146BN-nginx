package com.example.cadastros_service.application.ports;

import java.util.List;

import com.example.cadastros_service.domain.produto.Produto;

public interface ProdutoRepository {
    Produto save(Produto p);
    List<Produto> findAll();
    Produto findById(Long id);
    void delete(Long id);
}
