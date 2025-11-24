import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrosService {

  private baseUrl = 'http://localhost:8084/cadastros';

  constructor(private http: HttpClient) {}

  // ====================
  // PRODUTOS
  // ====================

  listarProdutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/produtos`);
  }

  criarProduto(produto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/produtos`, produto);
  }

  buscarProduto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/produtos/${id}`);
  }

  removerProduto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/produtos/${id}`);
  }

  // ====================
  // FORNECEDORES
  // ====================

  listarFornecedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/fornecedores`);
  }

  criarFornecedor(fornecedor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/fornecedores`, fornecedor);
  }

  buscarFornecedor(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/fornecedores/${id}`);
  }

  removerFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/fornecedores/${id}`);
  }
}
