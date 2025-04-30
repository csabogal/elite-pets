import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private authService: AuthService) {}

  private getPets(): Pet[] {
    try {
      return JSON.parse(localStorage.getItem('pets') || '[]');
    } catch (error) {
      console.error('Error getting pets:', error);
      return [];
    }
  }

  private savePets(pets: Pet[]) {
    try {
      localStorage.setItem('pets', JSON.stringify(pets));
    } catch (error) {
      console.error('Error saving pets:', error);
    }
  }

  getUserPets(): Pet[] {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser?.id) return [];

    return this.getPets().filter((pet) => pet.userId === currentUser.id);
  }

  addPet(pet: Omit<Pet, 'id'>): Pet {
    const pets = this.getPets();
    const newPet: Pet = {
      ...pet,
      id: Date.now(), // Usar timestamp para asegurar ID único
    };

    console.log('Adding new pet:', newPet); // Para debugging
    pets.push(newPet);
    this.savePets(pets);
    return newPet;
  }

  updatePet(id: number, pet: Partial<Pet>): boolean {
    const pets = this.getPets();
    const index = pets.findIndex((p) => p.id === id);

    if (index === -1) return false;

    pets[index] = { ...pets[index], ...pet };
    this.savePets(pets);
    return true;
  }

  deletePet(id: number): boolean {
    const pets = this.getPets();
    const index = pets.findIndex((p) => p.id === id);

    if (index === -1) return false;

    pets.splice(index, 1);
    this.savePets(pets);
    return true;
  }
}
