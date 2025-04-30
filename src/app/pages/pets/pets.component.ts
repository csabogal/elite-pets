import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from '../../core/models/pet.model';
import { PetService } from '../../core/services/pet.service';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];
  showForm = false;
  isEditing = false;

  newPet: Pet = {
    name: '',
    species: 'perro',
    breed: '',
    age: undefined,
    weight: undefined,
    userId: 0,
  };

  showDeleteModal = false;
  petToDelete: number | null = null;

  constructor(
    private petService: PetService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.newPet.userId = currentUser.id || 0;
    this.loadPets();
  }

  private loadPets() {
    this.pets = this.petService.getUserPets();
    console.log('Loaded pets:', this.pets); // Para debugging
  }

  onSubmit() {
    console.log('Submitting pet:', this.newPet); // Para debugging
    const currentUser = this.authService.currentUserValue;
    if (!currentUser?.id) {
      console.error('No user ID found'); // Para debugging
      return;
    }

    // Asegurarnos de que el userId esté establecido
    this.newPet.userId = currentUser.id;

    if (this.isEditing && this.newPet.id) {
      this.petService.updatePet(this.newPet.id, this.newPet);
    } else {
      const addedPet = this.petService.addPet(this.newPet);
      console.log('Added pet:', addedPet); // Para debugging
    }

    this.loadPets();
    this.resetForm();
  }

  editPet(pet: Pet) {
    this.newPet = { ...pet };
    this.showForm = true;
    this.isEditing = true;
  }

  deletePet(id: number) {
    this.petToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.petToDelete) {
      this.petService.deletePet(this.petToDelete);
      this.loadPets();
    }
    this.showDeleteModal = false;
    this.petToDelete = null;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.petToDelete = null;
  }

  resetForm() {
    this.newPet = {
      name: '',
      species: 'perro',
      breed: '',
      age: undefined,
      weight: undefined,
      userId: 0,
    };
    this.showForm = false;
    this.isEditing = false;
  }
}
