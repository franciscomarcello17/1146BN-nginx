package com.example.projetoservice.service;

import com.example.projetoservice.domain.projeto.Projeto;
import com.example.projetoservice.repository.ProjetoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetoService {

    private final ProjetoRepository repository;

    public ProjetoService(ProjetoRepository repository) {
        this.repository = repository;
    }

    public Projeto save(Projeto projeto) {
        return repository.save(projeto);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<Projeto> findAll() {
        return repository.findAll();
    }

    public Projeto findById(Long id) {
        return repository.findById(id).orElse(null);
    }
}