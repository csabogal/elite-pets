import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  errorMessage = '';
  successMessage = '';

  onSubmit() {
    // Limpiar mensajes previos
    this.errorMessage = '';
    this.successMessage = '';

    // Validación básica
    if (
      !this.contactData.name ||
      !this.contactData.email ||
      !this.contactData.message
    ) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactData.email)) {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido';
      return;
    }

    // Simular envío exitoso
    this.successMessage = '¡Mensaje enviado con éxito!';

    // Resetear el formulario y las validaciones
    this.contactForm.resetForm();

    // Limpiar los datos
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    // Mantener solo el mensaje de éxito
    this.errorMessage = '';
  }
}
