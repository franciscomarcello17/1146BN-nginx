import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstoqueService } from '../../../core/services/estoque';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-movimentacoes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movimentacoes-list.html',
  styleUrls: ['./movimentacoes-list.css']
})
export class MovimentacoesListComponent implements OnInit {
  movimentacoes: any[] = [];
  produtosMap: Map<number, any> = new Map();
  carregando = true;
  mensagem = '';

  // Estatísticas
  totalEntradas = 0;
  totalSaidas = 0;
  totalMovimentacoes = 0;

  constructor(
    private estoqueService: EstoqueService,
    private cadastrosService: CadastrosService
  ) {}

  ngOnInit(): void {
    this.carregarMovimentacoes();
  }

  carregarMovimentacoes(): void {
    this.carregando = true;
    this.estoqueService.listarTodasMovimentacoes().subscribe({
      next: async (movimentacoes) => {
        this.movimentacoes = movimentacoes;
        this.calcularEstatisticas();
        
        // Carrega informações dos produtos
        await this.carregarProdutos(movimentacoes);
        this.carregando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar movimentações';
        this.carregando = false;
      }
    });
  }

  private calcularEstatisticas(): void {
    this.totalEntradas = this.movimentacoes.filter(m => m.tipo === 'ENTRADA').length;
    this.totalSaidas = this.movimentacoes.filter(m => m.tipo === 'SAIDA').length;
    this.totalMovimentacoes = this.movimentacoes.length;
  }

  private async carregarProdutos(movimentacoes: any[]): Promise<void> {
    const produtoIds = [...new Set(movimentacoes.map(m => m.produtoId))];
    
    for (const produtoId of produtoIds) {
      try {
        const produto = await this.cadastrosService.buscarProduto(produtoId).toPromise();
        this.produtosMap.set(produtoId, produto);
      } catch (error) {
        console.error(`Erro ao carregar produto ${produtoId}:`, error);
      }
    }
  }

  getNomeProduto(produtoId: number): string {
    const produto = this.produtosMap.get(produtoId);
    return produto ? produto.nome : `Produto #${produtoId}`;
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

  getIconeTipo(tipo: string): string {
    return tipo === 'ENTRADA' ? '⬆️' : '⬇️';
  }
}