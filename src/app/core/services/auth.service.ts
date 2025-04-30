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

  register(email: string, password: string): boolean {
    try {
      if (!this.isBrowser) return false;

      const users = JSON.parse(this.getFromLocalStorage('users') || '[]');

      const userExists = users.some((u: User) => u.email === email);
      if (userExists) {
        return false;
      }

      const newUser: User = {
        id: users.length + 1,
        email,
        password,
        role: 'viewer',
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

  logout() {
    try {
      if (this.isBrowser) {
        this.removeFromLocalStorage('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
