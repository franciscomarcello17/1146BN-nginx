package com.example.estoque_service.domain.movimentacao;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movimentacao {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    private Long produtoId;
    private Integer quantidade;
    private String tipo;
    private LocalDateTime data;

    public void setData(LocalDateTime date) {
        data = date;
    }
}
