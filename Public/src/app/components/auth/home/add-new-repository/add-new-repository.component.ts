import { Component } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { RepositoriesService } from '../../../../services/repositories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-repository',
  templateUrl: './add-new-repository.component.html',
  styleUrl: './add-new-repository.component.css'
})
export class AddNewRepositoryComponent {
  optionsLanguage: string[] = ['Python', 'Java', 'C#', 'Angular', 'Other'];
  licenseRepository: string[] = ['MIT', 'PRIVATE', 'PUBLIC'];
  userData: any = {};
  nameRepository: string = '';
  descriptionRepository: string = '';
  typeRepository: string = 'Public';
  typeLanguageRepository: string = '';
  typeLicenseRepository: string = '';
  
  constructor(
    private user: UsersService,
    private repository: RepositoriesService,
    private router: Router) {
    this.getUser();
  }

  getUser() {
    this.userData = this.user.getUser();
  }

  createNewProject() {
    const newRepository = {
      projectName: this.nameRepository,
      type: this.typeRepository,
      descriotion: this.descriptionRepository,
      typeLanguage: this.typeLanguageRepository,
      typeLicense: this.typeLicenseRepository,
      dateOfModifide: new Date(),
      user: this.userData
    }

    this.repository.addNewRepository(newRepository).subscribe((res: any) => {
      if (res.status) {
        this.router.navigate(['/']);
      } else {
        console.log('Nije uspio da dodam novi repozitorijum')
      }
    })
  }
}
