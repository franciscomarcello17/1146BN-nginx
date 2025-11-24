package com.example.cadastros_service.infrastructure.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cadastros_service.application.ports.FornecedorRepository;
import com.example.cadastros_service.domain.fornecedor.Fornecedor;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/fornecedores")
@RequiredArgsConstructor
public class FornecedorController {

    private final FornecedorRepository repo;

    @GetMapping
    public List<Fornecedor> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Fornecedor criar(@RequestBody Fornecedor produto) {
        return repo.save(produto);
    }

    @GetMapping("/{id}")
    public Fornecedor buscar(@PathVariable Long id) {
        return repo.findById(id);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        repo.delete(id);
    }
}