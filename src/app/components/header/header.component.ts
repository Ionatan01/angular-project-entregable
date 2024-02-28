// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink, RouterLinkActive, Router, RouterModule } from '@angular/router';
// import { IUser } from '../../interfaces/user';
// import { UsersService } from '../../services/users.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css',
//   standalone: true,
//   imports: [RouterLink,RouterLinkActive,FormsModule],
// })
// export class HeaderComponent implements OnInit {

//   constructor(private usersService :UsersService){}

//   ngOnInit(): void {
//       this.usersService.userSubject.subscribe(user => this.user = user);
//       this.usersService.isLogged();
//   }

//   user: IUser | null = null;
//   defaultImage: string = 'assets/logo.svg'
// }

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { FilterService } from '../../services/filter.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private usersService :UsersService, private filterService :FilterService, private router: Router){}

  user: IUser | null = null;
  defaultImage: string = 'assets/logo.svg'
  filter: string='';

  ngOnInit(): void {
      this.usersService.userSubject.subscribe(user => this.user = user);
      this.usersService.isLogged();
  }

  changeFilter($event: Event){
      $event.preventDefault();
      this.filterService.searchFilter.next(this.filter)
  }

  logout(){
    this.usersService.logout();
    this.usersService.removeUserId();
    this.router.navigate(['userManagement','login']);
  }

  
}
