import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnDestroy {
  signInForm!: FormGroup;
  errorText: string | null = null;
  private ngUnsubscribe = new Subject<void>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9!@#$%^&*]+$'),
        Validators.minLength(8),
        Validators.maxLength(20)
      ]]
    });
  }

  onSubmit() {
    this.errorText = null; // Очищаем ошибку перед отправкой
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.signIn(email, password).pipe(
        catchError((error) => {
          this.errorText = error.message || 'Ошибка при входе';
          return throwError(() => error);
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe({
        next: () => {
          this.router.navigate(['']);
        }
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}