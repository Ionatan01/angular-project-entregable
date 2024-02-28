import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.css',
  standalone: true,
  imports: [RouterLink,CommonModule]
})
export class ArtworkComponent {
  @Input() artwork!: IArtwork;
  @Input() id?: string;
  
  @Output() likeChanged = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private artService: ApiServiceService) { }
  
  mouseover: boolean = false;

  toggleLike(){
    this.likeChanged.emit(this.artwork.like);
    console.log("Like");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Obtén el valor del parámetro 'id'
      console.log('ID de la URL:', this.id);
      if (this.id) {
        this.getArtwork([this.id]);
      }
    });
  }

  getArtwork(id: string[]) {
    this.artService.getArtworksFromIDs(id)
      .pipe(
        tap((artworks) => {
          this.artwork = artworks[0];
          console.log(this.artwork);
        }),
        catchError((error) => {
          console.error('Error');
          throw error;
        })
      )
      .subscribe();
  }
}