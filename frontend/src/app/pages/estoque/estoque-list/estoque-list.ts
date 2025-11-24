import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CadastrosService } from '../../../core/services/cadastros';
import { EstoqueService } from '../../../core/services/estoque';

@Component({
  selector: 'app-estoque-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estoque-list.html',
  styleUrls: ['./estoque-list.css']
})
export class EstoqueListComponent implements OnInit {
  produtos: any[] = [];
  estoques: Map<number, any> = new Map();
  carregando = true;
  mensagem = '';

  // Estatísticas
  totalProdutos = 0;
  comEstoque = 0;
  semEstoque = 0;
  estoqueBaixo = 0;

  constructor(
    private cadastrosService: CadastrosService,
    private estoqueService: EstoqueService
  ) {}

  ngOnInit(): void {
    this.carregarProdutosComEstoque();
  }

  carregarProdutosComEstoque(): void {
    this.carregando = true;
    
    // Primeiro carrega todos os produtos
    this.cadastrosService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.carregarEstoques(produtos);
      },
      error: () => {
        this.mensagem = 'Erro ao carregar produtos';
        this.carregando = false;
      }
    });
  }

  private carregarEstoques(produtos: any[]): void {
    let carregamentosConcluidos = 0;
    
    produtos.forEach(produto => {
      this.estoqueService.consultarEstoque(produto.id).subscribe({
        next: (estoque) => {
          this.estoques.set(produto.id, estoque);
          carregamentosConcluidos++;
          
          // Quando todos os estoques forem carregados
          if (carregamentosConcluidos === produtos.length) {
            this.calcularEstatisticas();
            this.carregando = false;
          }
        },
        error: () => {
          // Se não encontrar estoque, define como 0
          this.estoques.set(produto.id, { quantidade: 0 });
          carregamentosConcluidos++;
          
          if (carregamentosConcluidos === produtos.length) {
            this.calcularEstatisticas();
            this.carregando = false;
          }
        }
      });
    });

    // Caso não haja produtos
    if (produtos.length === 0) {
      this.carregando = false;
    }
  }

  private calcularEstatisticas(): void {
    this.totalProdutos = this.produtos.length;
    this.comEstoque = this.produtos.filter(p => this.getEstoque(p.id) > 0).length;
    this.semEstoque = this.produtos.filter(p => this.getEstoque(p.id) === 0).length;
    this.estoqueBaixo = this.produtos.filter(p => this.getEstoque(p.id) > 0 && this.getEstoque(p.id) <= 10).length;
  }

  getEstoque(produtoId: number): number {
    const estoque = this.estoques.get(produtoId);
    return estoque ? estoque.quantidade : 0;
  }

  getStatusEstoque(quantidade: number): string {
    if (quantidade === 0) return 'sem-estoque';
    if (quantidade <= 10) return 'estoque-baixo';
    return 'estoque-normal';
  }

  getTextoStatus(quantidade: number): string {
    if (quantidade === 0) return 'Sem Estoque';
    if (quantidade <= 10) return 'Estoque Baixo';
    return 'Em Estoque';
  }

  formatarPreco(preco: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  }
}