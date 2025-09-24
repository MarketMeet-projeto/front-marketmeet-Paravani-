import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent (Cadastro)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.cadastroForm.valid).toBeFalse();
  });

  it('username field validity (required + minlength)', () => {
    const username = component.cadastroForm.controls['username'];
    expect(username.valid).toBeFalse();
    expect(username.errors?.['required']).toBeTruthy();

    username.setValue('ab');
    expect(username.errors?.['minlength']).toBeTruthy();

    username.setValue('abc');
    expect(username.errors).toBeNull();
  });

  it('email field should validate email format', () => {
    const email = component.cadastroForm.controls['email'];
    email.setValue('not-an-email');
    expect(email.errors?.['email']).toBeTruthy();

    email.setValue('test@example.com');
    expect(email.errors).toBeNull();
  });

  it('password field should enforce minlength', () => {
    const password = component.cadastroForm.controls['password'];
    password.setValue('123');
    expect(password.errors?.['minlength']).toBeTruthy();

    password.setValue('123456');
    expect(password.errors).toBeNull();
  });

  it('birthDate field should be required', () => {
    const birthDate = component.cadastroForm.controls['birthDate'];
    expect(birthDate.valid).toBeFalse();
    expect(birthDate.errors?.['required']).toBeTruthy();

    birthDate.setValue('1990-01-01');
    expect(birthDate.errors).toBeNull();
  });

  it('should toggle password visibility (type attribute changes)', () => {
    const pwdInput = fixture.debugElement.query(By.css('#password')).nativeElement as HTMLInputElement;
    // initial should be password
    expect(pwdInput.type).toBe('password');

    component.togglePassword();
    fixture.detectChanges();
    expect(pwdInput.type).toBe('text');

    component.togglePassword();
    fixture.detectChanges();
    expect(pwdInput.type).toBe('password');
  });

  it('should set submitted = true and call alert when form is valid on submit', () => {
    spyOn(window, 'alert');

    component.cadastroForm.patchValue({
      username: 'Usuario Teste',
      birthDate: '01/01/1990',
      email: 'usuario@exemplo.com',
      password: 'abcdef'
    });

    expect(component.cadastroForm.valid).toBeTrue();

    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith('Conta criada com sucesso!');
  });

  it('should display validation messages after trying to submit an empty form', () => {
    // garantir estado inicial sem valores
    component.cadastroForm.reset();
    component.onSubmit(); // tenta submeter vazio
    fixture.detectChanges();

    const errorEls = fixture.debugElement.queryAll(By.css('.error'));
    expect(errorEls.length).toBeGreaterThan(0);
  });

  it('should display error message for username when empty', () => {
    const usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    usernameInput.value = '';
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('.form-group .error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Nome obrigatório');
  });

  it('should display error message for email when invalid format', () => {
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = 'invalid-email';
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.form-group .error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Insira um e-mail válido');
  });

  it('should display error message for password when too short', () => {
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    passwordInput.value = '123';
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.form-group .error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Mínimo de 6 caracteres');
  });

  it('should display error message for birthDate when empty', () => {
    const birthDateInput = fixture.debugElement.query(By.css('#birthDate')).nativeElement;
    birthDateInput.value = '';
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.form-group .error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Data de nascimento obrigatória');
  });
});
