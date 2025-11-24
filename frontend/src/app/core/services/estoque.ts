import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private baseUrl = 'http://localhost:8084/estoque/estoque';
  private movUrl = 'http://localhost:8084/estoque/movimentacoes';

  constructor(private http: HttpClient) {}

  // ====================
  // ESTOQUE
  // ====================

  consultarEstoque(produtoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${produtoId}`);
  }

  // ====================
  // MOVIMENTAÇÕES
  // ====================

  registrarEntrada(produtoId: number, quantidade: number): Observable<any> {
    return this.http.post(`${this.movUrl}/entrada`, {
      produtoId,
      quantidade
    });
  }

  registrarSaida(produtoId: number, quantidade: number): Observable<any> {
    return this.http.post(`${this.movUrl}/saida`, {
      produtoId,
      quantidade
    });
  }

  listarMovimentacoes(produtoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.movUrl}/${produtoId}`);
  }

  listarTodasMovimentacoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.movUrl}`);
  }
}
