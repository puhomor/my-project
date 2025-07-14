import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm!: FormGroup;
  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email : ['', [
        Validators.required,
        Validators.email
      ]],
      password : ['',[
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9!@#$%^&*]+$'),
        Validators.minLength(8),
        Validators.maxLength(20)
      ]]
    })
  }
  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.signIn(email, password).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Sign-in error:', error);
        }
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
