import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produtos-list.html',
  styleUrls: ['./produtos-list.css']
})
export class ProdutosListComponent implements OnInit {
  produtos: any[] = [];
  carregando = true;
  mensagem = '';

  constructor(private cadastrosService: CadastrosService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.cadastrosService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.carregando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar produtos';
        this.carregando = false;
      }
    });
  }

  excluirProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.cadastrosService.removerProduto(id).subscribe({
        next: () => {
          this.mensagem = 'Produto excluído com sucesso!';
          this.carregarProdutos();
        },
        error: () => {
          this.mensagem = 'Erro ao excluir produto';
        }
      });
    }
  }
}