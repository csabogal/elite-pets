import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PetService } from '../../core/services/pet.service';
import { User } from '../../core/models/user.model';
import { Pet } from '../../core/models/pet.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  isAdmin = false;
  totalPets = 0;
  totalUsers = 0;
  recentPets: Pet[] = [];
  petStats = {
    dogs: 0,
    cats: 0,
    others: 0,
  };

  constructor(
    private authService: AuthService,
    private petService: PetService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isAdmin = user?.role === 'admin';
      this.loadDashboardData();
    });
  }

  loadDashboardData() {
    if (this.isAdmin) {
      // Cargar datos para administrador
      this.totalUsers = this.authService.getAllUsers().length;
      const allPets = this.petService.getAllPets();
      this.totalPets = allPets.length;

      // Calcular estadísticas
      this.petStats = allPets.reduce(
        (stats, pet: Pet) => {
          if (pet.type === 'Perro') stats.dogs++;
          else if (pet.type === 'Gato') stats.cats++;
          else stats.others++;
          return stats;
        },
        { dogs: 0, cats: 0, others: 0 }
      );
    } else if (this.currentUser) {
      // Agregamos verificación de currentUser
      // Cargar datos para usuario normal
      const userPets = this.petService.getPetsByUserId(this.currentUser.id);
      this.totalPets = userPets.length;
      this.recentPets = userPets.slice(-3); // Últimas 3 mascotas
    }
  }
}
