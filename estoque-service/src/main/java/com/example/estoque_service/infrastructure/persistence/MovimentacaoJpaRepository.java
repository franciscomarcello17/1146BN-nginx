package com.example.estoque_service.infrastructure.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estoque_service.domain.movimentacao.Movimentacao;

public interface MovimentacaoJpaRepository extends JpaRepository<Movimentacao, Long> {

    List<Movimentacao> findByProdutoId(Long produtoId);
}
