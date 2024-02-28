import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';
import { ApiServiceService } from '../../services/api-service.service';
import { ArtworkComponent } from '../artwork/artwork.component';
import { ArtworkRowComponent } from '../artwork-row/artwork-row.component';
import { UsersService } from '../../services/users.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subscription, debounceTime, from, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkFilterPipe } from '../../pipes/artwork-filter.pipe';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-artwork-list-favorites',
  templateUrl: './artwork-list-favorites.component.html',
  styleUrl: './artwork-list-favorites.component.css',
  imports: [ArtworkFilterPipe,ArtworkComponent,ArtworkRowComponent,PaginationComponent,ArtworkFilterPipe],
  standalone: true
})
export class ArtworkListFavoritesComponent implements OnInit, OnDestroy {
  constructor(private artService: ApiServiceService,private usersService: UsersService,private router: Router, private filterService: FilterService) { }
  private subArtFav: Subscription = new Subscription();
  private subFilter: Subscription = new Subscription();
  protected cuadrosFav: IArtwork[] = [];
  protected filter: string = '';

  ngOnInit(): void {
    // this.artService.getArtWorks().subscribe((artworkList: IArtwork[]) => this.cuadros = artworkList);
    // this.subFilter = this.filterService.searchFilter
    //   .pipe(debounceTime(500))
    //   .subscribe((filter) => {
    //     this.handleSearchFilter(filter);
    //     if (!this.usersService.getUserId()) {
    //       this.loadArtNoLogin(this.currentPage,this.searchFilter);
    //     }
    //      else {
    //       this.loadArtUserLogged(this.currentPage,this.searchFilter);
    //     }
    //   });
    if (this.usersService.getUserId()) {
      this.loadFavorites();
      
    } else {
      this.router.navigate(['artworks']);
    }
  }

  ngOnDestroy(): void {
    this.subArtFav.unsubscribe();
    this.subFilter.unsubscribe();
  }

  toggleLike($event: boolean, artwork: IArtwork) {
    if (this.usersService.getUserId()) {
      console.log($event, artwork);
      if (artwork.like === true) {
        this.usersService.removeFavorite(artwork.id + "");
      } else {
        this.usersService.setFavorite(artwork.id + "");
        
      }
      artwork.like = !artwork.like;
    }
  }

  
  loadFavorites() {
    let favorites: string[];
    this.subArtFav = from(this.usersService.getFavoritesId())
      .pipe(
        tap((artworksList: string[]) => {
          favorites = artworksList;
          console.log("Favoritos");
          console.log(artworksList);
          
          
        }),
        switchMap(() => {
          return this.artService.getArtworksFromIDs(favorites);
        })
      )
      .subscribe((response) => {
        
          this.cuadrosFav = response.map((artwork: IArtwork) => {
            if (favorites.includes(artwork.id + '')) {
              artwork.like = true;
            }
            return artwork;
          });
          console.log(this.cuadrosFav);
        
      });
  }
}