import { Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private usersService: UsersService, private router: Router) { }
  mode: string = 'login';

  @Input()
  set setmode(value: string) {
    this.mode = value;
  }

  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  async login() {
    if (this.mode === "register") {
      console.log("modo");
      console.log(this.mode);
      let registered = await this.usersService.signUp(this.email, this.password);
      if (registered) {
        this.router.navigate(['favorites']);
      } else {
        this.error = 'Enter a correct email that is not already registered and a correct password'
      }
    } else {
      let logged = await this.usersService.login(this.email, this.password);
      if (logged) {
        this.router.navigate(['artworks']);
      } else {
        this.error = 'Bad Email or Password'
      }
      
    }
    
    
  }
}
