import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { RepositoriesService } from '../../../services/repositories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  parentData = 'home';
  userData: any = {};
  otherInformation: any = {};
  allRepository: any = [];
  nameRepository: string = '';
  descriptionRepository: string = '';
  typeRepository: string = '';
  typeLanguageRepository: string = '';
  typeLicenseRepository: string = '';
  options: string[] = ['Public', 'Private'];
  optionsLanguage: string[] = ['Python', 'Java', 'C#', 'Angular', 'Other'];
  licenseRepository: string[] = ['MIT', 'PRIVATE', 'PUBLIC'];
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private user: UsersService,
    private repository: RepositoriesService,
    private toastr: ToastrService) {
    this.getUser();
  }

  getUser() {
    this.userData = this.user.getUser();
    this.getUserOtherInformation();
    this.getAllRepository();
    this.firstName = this.userData.firstName;
    this.lastName = this.userData.lastName;
  }

  getUserOtherInformation() {
    this.user.getUserInformation(this.userData).subscribe((res: any) => {
      if (res.status) {
        this.otherInformation = res.data;
      } else {
        console.log('Nisu procitane ostale informacije o korisniku')
      }
    })
  }

  getAllRepository() {
    this.repository.getAllRepository(this.userData).subscribe((res: any) => {
      if (res.status) {
        let sortedItems = res.data.map((item: any) => ({...item, dateOfModifide: new Date(item.dateOfModifide)}))
          .sort((a: any, b: any) => b.dateOfModifide.getTime() - a.dateOfModifide.getTime());
        this.allRepository = sortedItems;
      } else {
        console.log('Nije pronasao ni jedan repozitory')
      }
    })
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
        this.allRepository.unshift(res.data);
      } else {
        console.log('Nije uspio da dodam novi repozitorijum')
      }
    })
  }

  updateUserProfile() {
    if (this.password.trim() !== '' || this.firstName.trim() !== '' || this.lastName.trim() !== '') {
      if (this.password.trim() !== '') {
        this.userData.password = this.password;
      }
      
      if (this.firstName.trim() !== '') {
        this.userData.firstName = this.firstName;
      }
      
      if (this.lastName.trim() !== '') {
        this.userData.lastName = this.lastName;
      }
      
      
      this.user.updateProfile(this.userData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success('Nismo mogli da azuriramo vase podatke');
        } else {
          this.toastr.error('Nismo mogli da azuriramo vase podatke');
        }
      })
    } else {
      this.toastr.warning('Niste promjenili ni jedan podatak!');
    }
    
  }
}
