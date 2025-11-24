import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-produtos-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produtos-details.html',
  styleUrls: ['./produtos-details.css']
})
export class ProdutosDetailsComponent implements OnInit {
  produto: any = null;
  carregando = true;
  mensagem = '';

  constructor(
    private cadastrosService: CadastrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarProduto(id);
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

  excluirProduto(): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.cadastrosService.removerProduto(this.produto.id).subscribe({
        next: () => {
          this.mensagem = 'Produto excluído com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/cadastros/produtos']);
          }, 1500);
        },
        error: () => {
          this.mensagem = 'Erro ao excluir produto';
        }
      });
    }
  }
}