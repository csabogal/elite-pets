export interface Pet {
  id: string;
  name: string;
  type: 'Perro' | 'Gato' | 'Otro';
  breed: string;
  species: string;
  age?: number;
  weight?: number;
  userId: string;
}
