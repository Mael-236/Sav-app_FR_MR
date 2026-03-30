import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurService, Utilisateur } from '../../services/utilisateur.service';

@Component({
  selector: 'app-users-manager-page',
  imports: [CommonModule],
  templateUrl: './users-manager-page.html',
  styleUrl: './users-manager-page.css',
})
export class UsersManagerPage implements OnInit {
  private utilisateurService = inject(UtilisateurService);

  utilisateurs: Utilisateur[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.isLoading = true;
    this.utilisateurService.getAll().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les utilisateurs.';
        this.isLoading = false;
      },
    });
  }

  deleteUtilisateur(id: number | null): void {
    if (id === null) return;
    if (!confirm('Supprimer cet utilisateur ?')) return;

    this.utilisateurService.delete(id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression.';
      },
    });
  }
}