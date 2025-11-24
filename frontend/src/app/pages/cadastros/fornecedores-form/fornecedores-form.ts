import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CadastrosService } from '../../../core/services/cadastros';

@Component({
  selector: 'app-fornecedores-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fornecedores-form.html',
  styleUrls: ['./fornecedores-form.css']
})
export class FornecedoresFormComponent implements OnInit {
  fornecedor = {
    nome: '',
    documento: '',
    telefone: ''
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
        this.carregarFornecedor(Number(params['id']));
      }
    });
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

  salvar(): void {
    this.carregando = true;
    this.mensagem = '';

    const operacao = this.editando 
      ? this.cadastrosService.criarFornecedor(this.fornecedor) // Em uma API real seria update
      : this.cadastrosService.criarFornecedor(this.fornecedor);

    operacao.subscribe({
      next: () => {
        this.mensagem = this.editando 
          ? 'Fornecedor atualizado com sucesso!' 
          : 'Fornecedor criado com sucesso!';
        this.carregando = false;
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/cadastros/fornecedores']);
        }, 2000);
      },
      error: () => {
        this.mensagem = 'Erro ao salvar fornecedor';
        this.carregando = false;
      }
    });
  }

  formatarDocumento(): void {
    // Remove caracteres não numéricos
    const documento = this.fornecedor.documento.replace(/\D/g, '');
    
    if (documento.length === 11) {
      // Formata CPF: 000.000.000-00
      this.fornecedor.documento = documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (documento.length === 14) {
      // Formata CNPJ: 00.000.000/0000-00
      this.fornecedor.documento = documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  }

  formatarTelefone(): void {
    // Remove caracteres não numéricos
    const telefone = this.fornecedor.telefone.replace(/\D/g, '');
    
    if (telefone.length === 11) {
      // Formata telefone: (00) 00000-0000
      this.fornecedor.telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length === 10) {
      // Formata telefone: (00) 0000-0000
      this.fornecedor.telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }
}