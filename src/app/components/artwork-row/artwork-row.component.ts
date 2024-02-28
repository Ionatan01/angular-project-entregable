import { Component, Input } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';

@Component({
  selector: '[app-artwork-row]',
  templateUrl: './artwork-row.component.html',
  styleUrl: './artwork-row.component.css',
  standalone: true,
  imports: [],
})
export class ArtworkRowComponent {
  @Input() artwork!: IArtwork;
}
