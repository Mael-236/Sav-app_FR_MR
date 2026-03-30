import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-subscribe-page',
  imports: [FormsModule],
  templateUrl: './subscribe-page.html',
  styleUrl: './subscribe-page.css',
})
export class SubscribePage {
  private router = inject(Router);
  private utilisateurService = inject(UtilisateurService);

  formData: RegisterForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
    if (this.formData.password.length < 8) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    this.isLoading = true;

    this.utilisateurService.create({
      id: null,
      username: this.formData.username,
      email: this.formData.email,
      nouveauMotDePasse: this.formData.password,
      role: { id: 2, nom: 'utilisateur', nomLogic: 'ROLE_UTILISATEUR' },
      estBanned: false,
    }).subscribe({
      next: () => {
        this.successMessage = 'Compte créé avec succès !';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Une erreur est survenue.';
        this.isLoading = false;
      },
    });
  }
}