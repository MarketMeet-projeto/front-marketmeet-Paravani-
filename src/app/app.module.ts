import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Necessário para FormGroup/FormControl
import { CommonModule } from '@angular/common'; // <-- Necessário para *ngIf, *ngFor


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // <-- Importa para usar formGroup
    CommonModule // <-- Importa para usar *ngIf, *ngFor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
