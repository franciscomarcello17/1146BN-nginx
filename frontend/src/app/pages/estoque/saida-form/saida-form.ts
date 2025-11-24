import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../../../core/services/estoque';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-saida-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './saida-form.html',
  styleUrls: ['./saida-form.css']
})
export class SaidaFormComponent implements OnInit {
  produto: any = null;
  estoque: any = null;
  quantidade = 0;
  carregando = false;
  mensagem = '';

  constructor(
    private estoqueService: EstoqueService,
    private cadastrosService: CadastrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const produtoId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDados(produtoId);
  }

  carregarDados(produtoId: number): void {
    this.carregando = true;
    
    this.cadastrosService.buscarProduto(produtoId).subscribe({
      next: (produto) => {
        this.produto = produto;
        
        this.estoqueService.consultarEstoque(produtoId).subscribe({
          next: (estoque) => {
            this.estoque = estoque;
            this.carregando = false;
          },
          error: () => {
            this.mensagem = 'Erro ao carregar estoque';
            this.carregando = false;
          }
        });
      },
      error: () => {
        this.mensagem = 'Produto não encontrado';
        this.carregando = false;
      }
    });
  }

  registrarSaida(): void {
    if (this.quantidade <= 0) {
      this.mensagem = 'A quantidade deve ser maior que zero';
      return;
    }

    if (this.quantidade > this.estoque.quantidade) {
      this.mensagem = `Quantidade indisponível. Estoque atual: ${this.estoque.quantidade} unidades`;
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    this.estoqueService.registrarSaida(this.produto.id, this.quantidade).subscribe({
      next: () => {
        this.mensagem = 'Saída registrada com sucesso!';
        this.carregando = false;
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/estoque/produto', this.produto.id]);
        }, 2000);
      },
      error: () => {
        this.mensagem = 'Erro ao registrar saída';
        this.carregando = false;
      }
    });
  }
}