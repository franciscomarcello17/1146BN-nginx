package com.example.cadastros_service.infrastructure.persistence;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.cadastros_service.application.ports.FornecedorRepository;
import com.example.cadastros_service.domain.fornecedor.Fornecedor;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FornecedorRepositoryAdapter implements FornecedorRepository {

    private final FornecedorJpaRepository repo;

    @Override
    public Fornecedor save(Fornecedor f) {
        return repo.save(f);
    }

    @Override
    public List<Fornecedor> findAll() {
        return repo.findAll();
    }

    @Override
    public Fornecedor findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
