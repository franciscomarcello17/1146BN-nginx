package com.example.estoque_service.infrastructure.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.estoque_service.application.services.MovimentacaoService;
import com.example.estoque_service.domain.movimentacao.Movimentacao;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/movimentacoes")
@RequiredArgsConstructor
public class MovimentacaoController {

    private final MovimentacaoService service;

    @GetMapping()
    public List<Movimentacao> obterTodas() {
        return service.getAll();
    }

    @PostMapping("/entrada")
    public Movimentacao registrarEntrada(@RequestBody Movimentacao mov) {
        return service.registrarMovimentacao(
                mov.getProdutoId(),
                mov.getQuantidade(),
                "ENTRADA"
        );
    }

    @PostMapping("/saida")
    public Movimentacao registrarSaida(@RequestBody Movimentacao mov) {
        return service.registrarMovimentacao(
                mov.getProdutoId(),
                mov.getQuantidade(),
                "SAIDA"
        );
    }

    @GetMapping("/{produtoId}")
    public List<Movimentacao> listar(@PathVariable Long produtoId) {
        return service.listarPorProduto(produtoId);
    }
}
