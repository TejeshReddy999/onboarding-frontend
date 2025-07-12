import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  message = '';
  error = '';
  constructor(private fb:FormBuilder,private authService: Authservice, private router: Router){

    this.registerForm = this.fb.group({
      name:['',Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['',Validators.required]
    }, { validators: this.passwordMatchValidator });

  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {

    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;

  }

  onSubmit() {
    console.log('Form submitted');
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.message = 'Registration successful! Redirecting to login...';
        this.error = '';
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.error = 'Registration failed. Please try again.';
        this.message = '';
      }
    });
  }
}
