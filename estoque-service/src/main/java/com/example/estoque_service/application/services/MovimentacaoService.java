package com.example.estoque_service.application.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.estoque_service.application.ports.EstoqueRepository;
import com.example.estoque_service.application.ports.MovimentacaoRepository;
import com.example.estoque_service.domain.estoque.Estoque;
import com.example.estoque_service.domain.movimentacao.Movimentacao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovimentacaoService {

    private final EstoqueRepository estoqueRepo;
    private final MovimentacaoRepository movRepo;

    public Movimentacao registrarMovimentacao(Long produtoId, Integer quantidade, String tipo) {

        // Busca estoque atual
        Estoque estoque = estoqueRepo.findByProdutoId(produtoId);

        if (estoque == null) {
            estoque = new Estoque(produtoId, 0);
        }

        if (estoque.getQuantidade() == null) {
            estoque.setQuantidade(0);
        }

        // Atualiza conforme tipo
        if (tipo.equalsIgnoreCase("ENTRADA")) {
            estoque.setQuantidade(estoque.getQuantidade() + quantidade);
        } else if (tipo.equalsIgnoreCase("SAIDA")) {
            if (estoque.getQuantidade() < quantidade) {
                throw new RuntimeException("Estoque insuficiente");
            }
            estoque.setQuantidade(estoque.getQuantidade() - quantidade);
        }

        // Salva o estoque atualizado
        estoqueRepo.save(estoque);

        // Salva a movimentação
        Movimentacao mov = new Movimentacao();
        mov.setProdutoId(produtoId);
        mov.setQuantidade(quantidade);
        mov.setTipo(tipo.toUpperCase());
        mov.setData(LocalDateTime.now());

        return movRepo.save(mov);
    }

    public Estoque consultarEstoque(Long produtoId) {
        return estoqueRepo.findByProdutoId(produtoId);
    }

    public List<Movimentacao> getAll() {
        return movRepo.findAll();
    }

    public List<Movimentacao> listarPorProduto(Long produtoId) {
        return movRepo.findByProdutoId(produtoId);
    }

}
