import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConfirmModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showDeleteModal = false;
  userToDelete: User | null = null;
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
    this.currentUser = this.authService.currentUserValue;
  }

  loadUsers() {
    this.users = this.authService.getAllUsers();
  }

  deleteUser(user: User) {
    if (user.id === this.currentUser?.id) {
      alert('No puedes eliminar tu propia cuenta');
      return;
    }
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (
      this.userToDelete &&
      this.authService.deleteUser(this.userToDelete.id!)
    ) {
      this.loadUsers();
    }
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  updateUserRole(user: User) {
    if (user.id === this.currentUser?.id) {
      alert('No puedes cambiar tu propio rol');
      return;
    }
    const newRole = user.role === 'admin' ? 'viewer' : 'admin';
    if (this.authService.updateUserRole(user.id!, newRole)) {
      this.loadUsers();
    }
  }
}
