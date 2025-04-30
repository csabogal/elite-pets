import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    if (this.isBrowser) {
      this.loadCurrentUser();
    }
  }

  private loadCurrentUser() {
    try {
      const storedUser = this.getFromLocalStorage('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
  }

  private getFromLocalStorage(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  private setInLocalStorage(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  private removeFromLocalStorage(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    try {
      if (!this.isBrowser) return false;

      const users = JSON.parse(this.getFromLocalStorage('users') || '[]');
      const user = users.find(
        (u: User) => u.email === email && u.password === password
      );

      if (user) {
        this.setInLocalStorage('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }

  register(email: string, password: string, isAdmin: boolean = false): boolean {
    try {
      if (!this.isBrowser) return false;

      const users = JSON.parse(this.getFromLocalStorage('users') || '[]');

      const userExists = users.some((u: User) => u.email === email);
      if (userExists) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        password,
        role: users.length === 0 ? 'admin' : isAdmin ? 'admin' : 'viewer',
      };

      users.push(newUser);
      this.setInLocalStorage('users', JSON.stringify(users));
      this.setInLocalStorage('currentUser', JSON.stringify(newUser));
      this.currentUserSubject.next(newUser);

      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  }

  getAllUsers(): User[] {
    try {
      if (!this.isBrowser) return [];
      const usersString = this.getFromLocalStorage('users');
      return usersString ? JSON.parse(usersString) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  deleteUser(id: string): boolean {
    try {
      if (!this.isBrowser) return false;

      const users = this.getAllUsers();
      const index = users.findIndex((u) => u.id === id);

      if (index === -1) return false;

      users.splice(index, 1);
      this.setInLocalStorage('users', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  updateUserRole(id: string, newRole: 'admin' | 'viewer'): boolean {
    try {
      if (!this.isBrowser) return false;

      const users = this.getAllUsers();
      const user = users.find((u) => u.id === id);

      if (!user) return false;

      user.role = newRole;
      this.setInLocalStorage('users', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  }

  public logout(): void {
    if (this.isBrowser) {
      this.removeFromLocalStorage('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/']);
    }
  }
}
