import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-fornecedores-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fornecedores-details.html',
  styleUrls: ['./fornecedores-details.css']
})
export class FornecedoresDetailsComponent implements OnInit {
  fornecedor: any = null;
  carregando = true;
  mensagem = '';

  constructor(
    private cadastrosService: CadastrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarFornecedor(id);
  }

  carregarFornecedor(id: number): void {
    this.carregando = true;
    this.cadastrosService.buscarFornecedor(id).subscribe({
      next: (fornecedor) => {
        this.fornecedor = fornecedor;
        this.carregando = false;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar fornecedor';
        this.carregando = false;
      }
    });
  }

  excluirFornecedor(): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.cadastrosService.removerFornecedor(this.fornecedor.id).subscribe({
        next: () => {
          this.mensagem = 'Fornecedor excluído com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/cadastros/fornecedores']);
          }, 1500);
        },
        error: () => {
          this.mensagem = 'Erro ao excluir fornecedor';
        }
      });
    }
  }

  formatarDocumento(documento: string): string {
    if (!documento) return '';
    
    const doc = documento.replace(/\D/g, '');
    if (doc.length === 11) {
      return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (doc.length === 14) {
      return documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return documento;
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return 'Não informado';
    
    const tel = telefone.replace(/\D/g, '');
    if (tel.length === 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (tel.length === 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  }
}