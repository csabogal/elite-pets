import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly PETS_KEY = 'pets';

  constructor(private authService: AuthService) {}

  getAllPets(): Pet[] {
    const petsString = localStorage.getItem(this.PETS_KEY);
    return petsString ? JSON.parse(petsString) : [];
  }

  getPetsByUserId(userId: string): Pet[] {
    const allPets = this.getAllPets();
    return allPets.filter((pet) => pet.userId === userId);
  }

  addPet(pet: Omit<Pet, 'id'>): Pet {
    const pets = this.getAllPets();
    const newPet: Pet = {
      ...pet,
      id: Date.now().toString(),
    };
    pets.push(newPet);
    localStorage.setItem(this.PETS_KEY, JSON.stringify(pets));
    return newPet;
  }

  updatePet(id: string, updatedPet: Pet): boolean {
    const pets = this.getAllPets();
    const index = pets.findIndex((p) => p.id === id);
    if (index !== -1) {
      pets[index] = { ...updatedPet, id };
      localStorage.setItem(this.PETS_KEY, JSON.stringify(pets));
      return true;
    }
    return false;
  }

  deletePet(id: string): boolean {
    const pets = this.getAllPets();
    const index = pets.findIndex((p) => p.id === id);
    if (index !== -1) {
      pets.splice(index, 1);
      localStorage.setItem(this.PETS_KEY, JSON.stringify(pets));
      return true;
    }
    return false;
  }
}
