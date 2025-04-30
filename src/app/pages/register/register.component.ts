import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (
      this.authService.register(
        this.registerData.email,
        this.registerData.password,
        this.registerData.isAdmin
      )
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'El correo electrónico ya está registrado';
    }
  }
}
