package com.example.estoque_service.infrastructure.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.estoque_service.application.services.MovimentacaoService;
import com.example.estoque_service.domain.estoque.Estoque;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/estoque")
@RequiredArgsConstructor
public class EstoqueController {

    private final MovimentacaoService service;

    @GetMapping("/{produtoId}")
    public Estoque consultar(@PathVariable Long produtoId) {
        return service.consultarEstoque(produtoId);
    }
}
