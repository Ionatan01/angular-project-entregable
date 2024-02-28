import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArtwork } from '../../interfaces/i-artwork';
import { ApiServiceService } from '../../services/api-service.service';
import { ArtworkComponent } from '../artwork/artwork.component';
import { ArtworkRowComponent } from '../artwork-row/artwork-row.component';
import { UsersService } from '../../services/users.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subscription, debounceTime, from, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ArtworkFilterPipe } from '../../pipes/artwork-filter.pipe';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrl: './artwork-list.component.css',
  imports: [ArtworkFilterPipe,ArtworkComponent,ArtworkRowComponent,PaginationComponent,ArtworkFilterPipe],
  standalone: true
})
export class ArtworkListComponent implements OnInit, OnDestroy {
  constructor(
    private artService: ApiServiceService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private filterService: FilterService,
  ) { }
  private subPagination: Subscription = new Subscription();
  private subArt: Subscription = new Subscription();
  private subFilter: Subscription = new Subscription();
  cuadros: IArtwork[] = [];
  currentPage!: number;
  totalPages!: number;
  searchFilter: string = '';
  protected filter: string = '';

  ngOnInit(): void {
    // this.artService.getArtWorks().subscribe((artworkList: IArtwork[]) => this.cuadros = artworkList);

    console.log("init");
    this.subPagination = this.route.params.subscribe((page) => {
      this.handleRouteParams(page);
      if (!this.usersService.getUserId()) {
        console.log("no log");
        this.loadArtNoLogin(this.currentPage,this.searchFilter);
      } 
      else {
        console.log("log");
        this.loadArtUserLogged(this.currentPage,this.searchFilter);
      }
    });
    this.subFilter = this.filterService.searchFilter
      .pipe(debounceTime(500))
      .subscribe((filter) => {
        this.handleSearchFilter(filter);
        if (!this.usersService.getUserId()) {
          this.loadArtNoLogin(this.currentPage,this.searchFilter);
        }
         else {
          this.loadArtUserLogged(this.currentPage,this.searchFilter);
        }
      });
  }

  ngOnDestroy(): void {
    console.log("destroy");
    
    this.subArt.unsubscribe();
    this.subFilter.unsubscribe();
    this.subPagination.unsubscribe();
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

  private handleRouteParams(page: any) {
    this.currentPage = + page['page'];
    if (isNaN(this.currentPage)) {
      // Si no es un número, asigna 1 a this.currentPage
      this.currentPage = 1;
    }
  }

  private handleSearchFilter(searchFilter: any) {
    this.searchFilter = searchFilter;
  }

  loadArtNoLogin(currentPage: number, filter: any) {
    this.subArt = this.artService
      .filterArtWorksWithPagination(currentPage, filter)
      .subscribe((response) => {
        if (this.currentPage > response.totalPages) {
          this.currentPage = response.totalPages;
          this.loadArtNoLogin(this.currentPage, filter);
        } else {
          this.cuadros = response.artworks;
          this.totalPages = response.totalPages;
        }
      });
  }
  
  loadArtUserLogged(currentPage: number, filter: any) {
    console.log("art Logged");
    let favorites: string[];
    this.subArt = from(this.usersService.getFavoritesId())
      .pipe(
        tap((artworksList: string[]) => {
          favorites = artworksList;
          
          
        }),
        switchMap(() => {
          return this.artService.filterArtWorksWithPagination(currentPage,filter);
        })
      )
      .subscribe((response) => {
        if (this.currentPage > response.totalPages) {
          this.currentPage = response.totalPages;
          this.loadArtUserLogged(this.currentPage, filter);
        } else {
          this.cuadros = response.artworks.map((artwork: IArtwork) => {
            if (favorites.includes(artwork.id + '')) {
              artwork.like = true;
            }
            return artwork;
          });
          console.log(this.cuadros);
          this.totalPages = response.totalPages;
        }
      });
  }


}