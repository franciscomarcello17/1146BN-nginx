package com.example.cadastros_service.domain.produto;

import com.example.cadastros_service.domain.fornecedor.Fornecedor;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import java.math.BigDecimal;
import lombok.Data;

@Entity
@Data
public class Produto {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private String categoria;

    @ManyToOne
    private Fornecedor fornecedor;

    @Column(precision = 10, scale = 2)
    private BigDecimal preco;
}
