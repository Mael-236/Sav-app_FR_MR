import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Utilisateur {
  id: number | null;
  username: string;
  email: string;
  nouveauMotDePasse?: string;
  role: { id: number; nom: string; nomLogic: string };
  estBanned: boolean;
  recettes?: any[];
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private readonly API_URL = 'http://localhost:8080/api-savon/v1/utilisateur';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.API_URL, {
      headers: this.authHeaders(),
    });
  }

  create(utilisateur: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.API_URL, utilisateur, {
      headers: this.authHeaders(),
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, {
      headers: this.authHeaders(),
    });
  }
}