import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-fornecedores-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fornecedores-list.html',
  styleUrls: ['./fornecedores-list.css']
})
export class FornecedoresListComponent implements OnInit {
  fornecedores: any[] = [];
  carregando = true;
  mensagem = '';

  constructor(private cadastrosService: CadastrosService) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.carregando = true;
    this.cadastrosService.listarFornecedores().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
        this.carregando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar fornecedores';
        this.carregando = false;
      }
    });
  }

  excluirFornecedor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.cadastrosService.removerFornecedor(id).subscribe({
        next: () => {
          this.mensagem = 'Fornecedor excluído com sucesso!';
          this.carregarFornecedores();
        },
        error: () => {
          this.mensagem = 'Erro ao excluir fornecedor';
        }
      });
    }
  }
}