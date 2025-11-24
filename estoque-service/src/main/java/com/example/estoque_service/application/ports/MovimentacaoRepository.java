package com.example.estoque_service.application.ports;

import java.util.List;

import com.example.estoque_service.domain.movimentacao.Movimentacao;

public interface MovimentacaoRepository {
    Movimentacao save(Movimentacao mov);
    List<Movimentacao> findByProdutoId(Long produtoId);
    List<Movimentacao> findAll();
}
