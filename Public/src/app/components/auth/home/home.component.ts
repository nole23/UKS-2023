import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { RepositoriesService } from '../../../services/repositories.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // parentData = 'home';
  userData: any = {};
  otherInformation: any = {};
  userInformation: any = {};
  allRepositories: any = [];
  isEdit: boolean = false;
  currentHeaderTab: string = 'overview';

  constructor(
    private user: UsersService,
    private repository: RepositoriesService,
    private toastr: ToastrService,
    private router: Router) {
    this.getUser();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      let url = null;
      if (event.routerEvent) {
        url = event.routerEvent.url;
      } else {
        url = event.url;
      }
      if (url.split('/')[1] === '') {
        this.currentHeaderTab = 'overview';
      }
      if (url.split('/')[1] === 'all-repo') {
        this.currentHeaderTab = 'all-repo';
      }
      if (url.split('/')[1] === 'all-project') {
        this.currentHeaderTab = 'all-project';
      }
    });
    localStorage.removeItem('project');
  }

  getUser() {
    this.userData = this.user.getUser();
    this.getUserOtherInformation();
    this.getAllRepository();
  }

  getUserOtherInformation() {
    this.user.getUserInformation(this.userData).subscribe((res: any) => {
      if (res.status) {
        this.otherInformation = res.data;
        this.userInformation = res.data.userInformation;
      } else {
        this.toastr.warning('Unable to display other user information');
      }
    })
  }

  getAllRepository() {
    this.repository.getAllRepository(this.userData, 'basic').subscribe((res: any) => {
      if (res.status) {
        this.allRepositories = res.data.map((item: any) => ({...item, dateOfModifide: new Date(item.dateOfModifide)}));
      } else {
        this.toastr.warning('Unable to get repository');
      }
    })
  }


  // New
  isEditClick(isEdit: boolean) {
    this.isEdit = isEdit
  }
  
  updateUser(user: any) {
    this.userData = user;
  }
}
