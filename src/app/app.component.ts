import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  private apiUrl = 'http://10.51.47.41:3000/api/users/login'; // URL do backend

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login realizado com sucesso:', response);
          alert('Login realizado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao fazer login:', error);
          alert('Erro ao fazer login. Por favor, verifique suas credenciais.');
        }
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
  }

  getFieldError(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return field === 'email' ? 'E-mail é obrigatório' : 'Senha é obrigatória';
      }
      if (control.errors['email']) {
        return 'Digite um e-mail válido';
      }
      if (control.errors['minlength']) {
        return 'Senha deve ter pelo menos 6 caracteres';
      }
    }
    return '';
  }

  onForgotPassword() {
    alert('Funcionalidade de recuperação de senha');
  }

  onSignUp() {
    alert('Redirecionar para página de cadastro');
  }
}