// src/app/app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create login form with username and password fields', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    
    expect(app.loginForm.contains('username')).toBeTruthy();
    expect(app.loginForm.contains('password')).toBeTruthy();
  });

  it('should mark username as invalid when empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    
    const username = app.loginForm.get('username');
    expect(username?.valid).toBeFalsy();
  });

  it('should mark password as invalid when less than 6 characters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    
    const password = app.loginForm.get('password');
    password?.setValue('12345');
    expect(password?.valid).toBeFalsy();
  });

  it('should mark form as valid when fields are correctly filled', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    
    app.loginForm.get('username')?.setValue('usuario@email.com');
    app.loginForm.get('password')?.setValue('123456');
    expect(app.loginForm.valid).toBeTruthy();
  });
});