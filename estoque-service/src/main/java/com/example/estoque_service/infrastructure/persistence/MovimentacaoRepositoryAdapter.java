package com.example.estoque_service.infrastructure.persistence;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.estoque_service.application.ports.MovimentacaoRepository;
import com.example.estoque_service.domain.movimentacao.Movimentacao;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MovimentacaoRepositoryAdapter implements MovimentacaoRepository {

    private final MovimentacaoJpaRepository jpa;

    @Override
    public List<Movimentacao> findAll() {
        return jpa.findAll();
    }
    @Override
    public Movimentacao save(Movimentacao mov) {
        mov.setData(LocalDateTime.now());
        return jpa.save(mov);
    }

    @Override
    public List<Movimentacao> findByProdutoId(Long produtoId) {
        return jpa.findByProdutoId(produtoId);
    }
}
