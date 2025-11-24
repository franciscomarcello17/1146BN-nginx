package com.example.cadastros_service.infrastructure.persistence;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.cadastros_service.application.ports.ProdutoRepository;
import com.example.cadastros_service.domain.produto.Produto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProdutoRepositoryAdapter implements ProdutoRepository {

    private final ProdutoJpaRepository repo;

    @Override
    public Produto save(Produto p) {
        return repo.save(p);
    }

    @Override
    public List<Produto> findAll() {
        return repo.findAll();
    }

    @Override
    public Produto findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
