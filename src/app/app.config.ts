import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { PetService } from './core/services/pet.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService, // Agregamos el servicio aquí
    PetService, // Y también el servicio de mascotas
  ],
};
