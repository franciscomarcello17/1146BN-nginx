import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  mensagem = '';

  constructor(private auth: AuthService) {}

  register() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.auth.register(user).subscribe({
      next: () => this.mensagem = 'Usuário registrado!',
      error: () => this.mensagem = 'Erro ao registrar.'
    });
  }
}
