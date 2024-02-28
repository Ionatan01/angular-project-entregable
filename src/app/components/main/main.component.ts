import { Component } from '@angular/core';
import { ArtworkListComponent } from '../artwork-list/artwork-list.component';
import { ArtworkComponent } from '../artwork/artwork.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,
  imports: [RouterOutlet]
})
export class MainComponent {

}
