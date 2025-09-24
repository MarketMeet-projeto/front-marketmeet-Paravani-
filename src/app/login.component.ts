import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      // Aqui você pode chamar seu serviço de autenticação
      console.log('Dados de login:', loginData);
      
      // Simulação de login bem-sucedido
      this.handleSuccessfulLogin(loginData);
      
    } else {
      this.markFormGroupTouched();
    }
  }

  private handleSuccessfulLogin(loginData: any): void {
    // Aqui você salvaria o token de autenticação
    localStorage.setItem('user', JSON.stringify({ username: loginData.username }));
    
    // Redirecionar para dashboard ou página principal
    // this.router.navigate(['/dashboard']);
    
    alert(`Login realizado com sucesso!\nUsuário: ${loginData.username}`);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  onForgotPassword(): void {
    // Implementar lógica de recuperação de senha
    alert('Funcionalidade de recuperação de senha em desenvolvimento!');
  }

  onSignUp(): void {
    // Navegar para página de cadastro
    // this.router.navigate(['/cadastro']);
    alert('Redirecionando para página de cadastro...');
  }

  // Métodos auxiliares para validação
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} é obrigatório`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} deve ter pelo menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      username: 'E-mail ou Nome de usuário',
      password: 'Senha'
    };
    return labels[fieldName] || fieldName;
  }
}