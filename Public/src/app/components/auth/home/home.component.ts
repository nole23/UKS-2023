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
  filterRepositories: any = [];
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  dropdownOpen: boolean = false;
  dropdownOpen1: boolean = false;
  dropdownOpen2: boolean = false;
  selectOneOptions: boolean = false;
  selectTwoOptions: boolean = false;
  selectLangage: string = "All";
  selectType: string = "All";
  selectSort: string = 'Name';
  optionsLanguage: string[] = ['All', 'Python', 'Java', 'C#', 'Angular', 'Other'];
  optionsType: string[] = ['All', 'MIT', 'PRIVATE', 'PUBLIC'];
  optionsSort: string[] = ['Name', 'Last update'];
  searchText: string = '';

  constructor(
    private user: UsersService,
    private repository: RepositoriesService,
    private toastr: ToastrService) {
    this.getUser();
  }

  ngOnInit(): void {
    localStorage.removeItem('project');
    this._getOpions();
    this._getLanguage();
    this._getType();
  }

  _getType() {
    let selectType = localStorage.getItem('selectType');
    if (selectType === null) {
      localStorage.setItem('selectType', JSON.stringify({selectType: this.selectType}));
    } else {
      this.selectType = JSON.parse(selectType).selectType;
    }
  }

  _getLanguage() {
    let selectLangage = localStorage.getItem('selectLanguage');
    if (selectLangage === null) {
      localStorage.setItem('selectLanguage', JSON.stringify({selectLanguage: this.selectLangage}));
    } else {
      this.selectLangage = JSON.parse(selectLangage).selectLanguage;
    }
  }

  _getOpions() {
    let selectOption = localStorage.getItem('selectOption');
    if (selectOption === null) {
      localStorage.setItem('selectOption', JSON.stringify({selectOptions: this.selectSort}));
    } else {
      this.selectSort = selectOption = JSON.parse(selectOption).selectOptions;
    }
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
        this.allRepository = res.data.map((item: any) => ({...item, dateOfModifide: new Date(item.dateOfModifide)}));
        this._filterRepository();
      } else {
        console.log('Nije pronasao ni jedan repozitory')
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

  toggleDropdown() {
    if (this.dropdownOpen1) {
      this.dropdownOpen1 = !this.dropdownOpen1;
    }
    if (this.dropdownOpen2) {
      this.dropdownOpen2 = !this.dropdownOpen2;
    }
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleDropdown1() {
    if (this.dropdownOpen) {
      this.dropdownOpen = !this.dropdownOpen;
    }
    if (this.dropdownOpen2) {
      this.dropdownOpen2 = !this.dropdownOpen2;
    }
    this.dropdownOpen1 = !this.dropdownOpen1;
  }

  toggleDropdown2() {
    if (this.dropdownOpen) {
      this.dropdownOpen = !this.dropdownOpen;
    }
    if (this.dropdownOpen1) {
      this.dropdownOpen1 = !this.dropdownOpen1;
    }
    this.dropdownOpen2 = !this.dropdownOpen2;
  }

  selectOption(option: string) {
    if (option === 'Name') {
      this.selectSort = option;
      localStorage.removeItem('selectOption')
      localStorage.setItem('selectOption', JSON.stringify({selectOneOptions: false, selectTwoOptions: true}));

      this.filterRepositories = this._sortByName(this.filterRepositories);
    } else {
      this.selectSort = option;
      localStorage.removeItem('selectOption')
      localStorage.setItem('selectOption', JSON.stringify({selectOneOptions: true, selectTwoOptions: false}));
      this.filterRepositories = this.filterRepositories.sort((a: any, b: any) => b.dateOfModifide.getTime() - a.dateOfModifide.getTime());
    }
    this.dropdownOpen = false;
  }

  selectLanguage(language: string) {
    this.selectLangage = language;
    this.dropdownOpen1 = false;
    localStorage.removeItem('selectLanguage')
    localStorage.setItem('selectLanguage', JSON.stringify({selectLanguage: this.selectLangage}))

    this._filterRepository();
  }

  selectType1(type: string) {
    this.selectType = type;
    this.dropdownOpen2 = false;
    localStorage.removeItem('selectType')
    localStorage.setItem('selectType', JSON.stringify({selectType: this.selectType}));

    this._filterRepository();
  }

  getRepositoryByFilter(language: string, type: string) {
    // this.repository.getAllRepositoryByFilter({user: this.userData,  language: language, type: type}).subscribe((res: any) => {
    //   if (res.status) {
    //     let sortedItems = res.data.map((item: any) => ({...item, dateOfModifide: new Date(item.dateOfModifide)}))
    //       .sort((a: any, b: any) => b.dateOfModifide.getTime() - a.dateOfModifide.getTime());
    //     this.allRepository = sortedItems;
    //   } else {
    //     console.log('Nije pronasao ni jedan repozitory')
    //   }
    // })
  }

  _sortByName(array: any[]): any[] {
    return array.sort((a, b) => {
      const nameA = a.projectName.toUpperCase();
      const nameB = b.projectName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  _filterObjekata(filterKriterijumi: any) {
    return this.allRepository.filter((objekat: any) => {
        for (let kriterijum in filterKriterijumi) {
            if (objekat[kriterijum] !== filterKriterijumi[kriterijum]) {
                return false;
            }
        }
        return true;
    });
}

  _filterRepository() {
    if (this.selectLangage === 'All' && this.selectType === 'All') {
      this.filterRepositories = this.allRepository;
    } else {
      let filter: any = {};
      if (this.selectLangage !== 'All') {
        filter['typeLanguage'] = this.selectLangage;
      }
      if (this.selectType !== 'All') {
        filter['typeLicense'] = this.selectType;
      }
  
      this.filterRepositories = this._filterObjekata(filter)
    }
  }

  filterItems() {
    if (this.searchText.length > 1) {
      this.filterRepositories = this.allRepository.filter((item: any) => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().includes(this.searchText.toLowerCase());
        })
      });
    } else {
      this._filterRepository();
    }
  }
}
