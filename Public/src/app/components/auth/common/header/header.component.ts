import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() sharedData: string = '';
  userData: any = {};

  constructor(
    private router: Router,
    private user: UsersService) {
      this.getUser();
    }

  getUser() {
    this.userData = this.user.getUser();
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  
}
