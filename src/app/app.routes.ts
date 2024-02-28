import { Routes } from '@angular/router';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { ArtworkComponent } from './components/artwork/artwork.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArtworkListFavoritesComponent } from './components/artwork-list-favorites/artwork-list-favorites.component';

export const routes: Routes = [
  {path: 'artworks', component: ArtworkListComponent},
  // {path: 'artworks/:onlyFavorites', component: ArtworkListComponent},
  {path: 'artworks/page/:page', component: ArtworkListComponent},
  {path: 'artwork/:id', component: ArtworkComponent},
  // {path: 'profile', component: ProfileComponent},
  {path: 'favorites', component: ArtworkListFavoritesComponent},
  {path: 'userManagement/:setmode', component: LoginComponent},
  // {path: 'userManagement/:logout', component: LoginComponent},
  { path: '**', redirectTo: 'artworks'}

];
