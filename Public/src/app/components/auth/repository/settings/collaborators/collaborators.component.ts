import { Component, Input } from '@angular/core';
import { UsersService } from '../../../../../services/users.service';
import { RepositoriesService } from '../../../../../services/repositories.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {
  @Input() repositoryData: any = {};
  searchText1: string = '';
  users: any = [];

  constructor(private user: UsersService, private repository: RepositoriesService) { }

  filterItems() {
    if (this.searchText1.length > 1) {
      this.user.filterUser(this.searchText1).subscribe((res: any) => {
        let user2 = this.repositoryData.listUser;
        let user1 = this._filterAddUser(user2, res.users);
        this.users = user1;
      })
    }
  }

  _filterAddUser(user1: any, user2: any) {
    user2.forEach((u2: any) => {
      let matchingUser = user1.find((u1: any) => u1.user.id === u2.id)
      if (!matchingUser) {
        u2['isChecked'] = false;
      }
    });
    return user2;
  }

  addPeople() {
    let itemWithIsCheck = this.users.find((item: any) => item.isChecked !== undefined);
    this.repository.addCollaborators(itemWithIsCheck.id, this.repositoryData.id).subscribe((res: any) => {
      let us = {
        role: {roleName: 'C'},
        user: {
          firstName: itemWithIsCheck.firstName,
          id: itemWithIsCheck.id,
          lastName: itemWithIsCheck.lastName,
          username: itemWithIsCheck.username
        }
      }
      this.repositoryData.listUser.push(us)
    })
  }
}
