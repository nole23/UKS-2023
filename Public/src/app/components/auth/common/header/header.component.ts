import { Component, Input } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { UsersService } from '../../../../services/users.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userData: any = {};
  project: any = {};
  currentTab: any = null;

  constructor(
    private router: Router,
    private user: UsersService) {
      this.getUser();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtrira događaje da uhvati samo kraj navigacije
    ).subscribe((event: any) => {
      if (event.url.split('/')[1] === 'repository') {
        this.currentTab = event.url.split('/')[3];
      }
    });
  }

  getUser() {
    this.userData = this.user.getUser();
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isReposiotiry() {
    let p = localStorage.getItem('project');
    
    if (p){
      this.project = JSON.parse(p);
      return true;
    }
    return false;
  }

  ngOwn(list: any) {
    let res = ''
    list.forEach((element: any) => {
      if (element.role.roleName === 'O') {
        res = element.user.username
      }
    });
    return res;
  }
  
}
