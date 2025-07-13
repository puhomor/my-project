import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
        Validators.maxLength(15)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яА-Я-]+$'),
        Validators.maxLength(25)
      ]],
      middleName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
        Validators.maxLength(25)
      ]],
      gender: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9!@#$%^&*]+$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchPassword.bind(this) });
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, firstName, lastName, middleName } = this.registerForm.value;
      const name = `${firstName} ${lastName} ${middleName}`; // Формируем ФИО
      this.authService.signUp(email, password, name).subscribe({
        next: () => {
          console.log('Форма регистрации отправлена:', this.registerForm.value);
          this.router.navigate(['']); // Перенаправление на главную страницу
        },
        error: (error) => {
          console.error('Registration error:', error);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}