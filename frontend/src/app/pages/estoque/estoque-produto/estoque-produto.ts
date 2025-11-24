import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../../../core/services/estoque';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-estoque-produto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estoque-produto.html',
  styleUrls: ['./estoque-produto.css']
})
export class EstoqueProdutoComponent implements OnInit {
  produto: any = null;
  estoque: any = null;
  movimentacoes: any[] = [];
  carregando = true;
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
    
    // Carrega dados do produto
    this.cadastrosService.buscarProduto(produtoId).subscribe({
      next: (produto) => {
        this.produto = produto;
        
        // Carrega estoque
        this.estoqueService.consultarEstoque(produtoId).subscribe({
          next: (estoque) => {
            this.estoque = estoque;
            
            // Carrega movimentações
            this.estoqueService.listarMovimentacoes(produtoId).subscribe({
              next: (movimentacoes) => {
                this.movimentacoes = movimentacoes;
                this.carregando = false;
              },
              error: () => {
                this.mensagem = 'Erro ao carregar movimentações';
                this.carregando = false;
              }
            });
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

  formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR');
  }

  getTipoMovimentacao(tipo: string): string {
    return tipo === 'ENTRADA' ? 'Entrada' : 'Saída';
  }

  getClasseTipo(tipo: string): string {
    return tipo === 'ENTRADA' ? 'entrada' : 'saida';
  }
}