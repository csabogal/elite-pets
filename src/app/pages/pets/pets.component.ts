import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../core/services/pet.service';
import { AuthService } from '../../core/services/auth.service';
import { Pet } from '../../core/models/pet.model';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];
  showForm = false;
  showDeleteModal = false;
  petToDelete: string | null = null;
  isEditing = false;
  newPet: Pet = {
    id: '',
    name: '',
    type: 'Perro',
    breed: '',
    species: '',
    userId: '',
    age: undefined,
    weight: undefined,
  };

  constructor(
    private petService: PetService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.pets = this.petService.getPetsByUserId(currentUser.id);
    }
  }

  onSubmit() {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) return;

    const petToAdd = {
      ...this.newPet,
      userId: currentUser.id,
    };

    if (this.isEditing) {
      this.petService.updatePet(this.newPet.id, petToAdd);
    } else {
      const { id, ...petWithoutId } = petToAdd;
      this.petService.addPet(petWithoutId);
    }

    this.resetForm();
    this.loadPets();
  }

  editPet(pet: Pet) {
    this.newPet = { ...pet };
    this.isEditing = true;
    this.showForm = true;
  }

  deletePet(id: string) {
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
      id: '',
      name: '',
      type: 'Perro',
      breed: '',
      species: '',
      userId: '',
      age: undefined,
      weight: undefined,
    };
    this.isEditing = false;
    this.showForm = false;
  }
}
