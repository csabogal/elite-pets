export interface Pet {
  id?: number;
  name: string;
  species: 'perro' | 'gato' | 'otro';
  breed?: string;
  age?: number;
  weight?: number;
  userId: number;
}
