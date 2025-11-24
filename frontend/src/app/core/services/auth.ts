import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8084/auth';
  private redirectTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login/password`, { email, password })
      .pipe(
        tap((response: any) => {
          // Salva o token no localStorage (se aplicável)
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          
          // Inicia o timer para redirecionamento
          this.startRedirectTimer();
        })
      );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }

  private startRedirectTimer(): void {
    // Cancela qualquer timer existente
    this.clearRedirectTimer();
    
    // Configura novo timer para 3 segundos
    this.redirectTimer = setTimeout(() => {
      this.router.navigate(['/home']); // ou ['/dashboard'] conforme sua rota
    }, 3000);
  }

  private clearRedirectTimer(): void {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
      this.redirectTimer = null;
    }
  }

  // Limpa o timer quando o serviço for destruído
  ngOnDestroy(): void {
    this.clearRedirectTimer();
  }
}