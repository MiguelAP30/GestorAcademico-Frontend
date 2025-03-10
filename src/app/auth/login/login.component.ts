import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Por favor, complete todos los campos';
      return;
    }

    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loginService.saveToken(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error.status === 401 ? 'Usuario o contraseña incorrectos' : 'Error al intentar iniciar sesión';
        console.error('Error de login:', error);
      }
    });
  }
}
