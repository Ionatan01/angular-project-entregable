import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArtworkComponent } from './components/artwork/artwork.component';
import { MainComponent } from './components/main/main.component';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtworkRowComponent } from './components/artwork-row/artwork-row.component';
import { PaginationComponentComponent } from './components/pagination-component/pagination-component.component';
import { ArtworkFilterPipe } from './pipes/artwork-filter.pipe';
import { RegisterComponent } from './components/register/register.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ArtworkListComponent,
    LoginComponent,
    ProfileComponent,
    ArtworkRowComponent,
    PaginationComponentComponent,
    ArtworkFilterPipe,
    RegisterComponent,
    PaginationComponent
  ],
  imports: [
    ArtworkComponent,
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,ArtworkListComponent,ArtworkRowComponent]
})
export class AppModule { }
