import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../../../core/services/estoque';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-entrada-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './entrada-form.html',
  styleUrls: ['./entrada-form.css']
})
export class EntradaFormComponent implements OnInit {
  produto: any = null;
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
    this.carregarProduto(produtoId);
  }

  carregarProduto(produtoId: number): void {
    this.carregando = true;
    this.cadastrosService.buscarProduto(produtoId).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.carregando = false;
      },
      error: () => {
        this.mensagem = 'Produto não encontrado';
        this.carregando = false;
      }
    });
  }

  registrarEntrada(): void {
    if (this.quantidade <= 0) {
      this.mensagem = 'A quantidade deve ser maior que zero';
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    this.estoqueService.registrarEntrada(this.produto.id, this.quantidade).subscribe({
      next: () => {
        this.mensagem = 'Entrada registrada com sucesso!';
        this.carregando = false;
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/estoque/produto', this.produto.id]);
        }, 2000);
      },
      error: () => {
        this.mensagem = 'Erro ao registrar entrada';
        this.carregando = false;
      }
    });
  }
}