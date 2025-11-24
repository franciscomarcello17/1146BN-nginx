import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produtos-form.html',
  styleUrls: ['./produtos-form.css']
})
export class ProdutosFormComponent implements OnInit {
  produto = {
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0
  };
  
  editando = false;
  carregando = false;
  mensagem = '';

  constructor(
    private cadastrosService: CadastrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.editando = true;
        this.carregarProduto(Number(params['id']));
      }
    });
  }

  carregarProduto(id: number): void {
    this.carregando = true;
    this.cadastrosService.buscarProduto(id).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.carregando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar produto';
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    this.carregando = true;
    this.mensagem = '';

    const operacao = this.editando 
      ? this.cadastrosService.criarProduto(this.produto) // Em uma API real seria update
      : this.cadastrosService.criarProduto(this.produto);

    operacao.subscribe({
      next: () => {
        this.mensagem = this.editando 
          ? 'Produto atualizado com sucesso!' 
          : 'Produto criado com sucesso!';
        this.carregando = false;
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/cadastros/produtos']);
        }, 2000);
      },
      error: () => {
        this.mensagem = 'Erro ao salvar produto';
        this.carregando = false;
      }
    });
  }
}