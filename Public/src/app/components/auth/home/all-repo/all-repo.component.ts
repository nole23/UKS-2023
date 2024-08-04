import { Component, Input } from '@angular/core';
import { RepositoriesService } from '../../../../services/repositories.service';
import { UsersService } from '../../../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-repo',
  templateUrl: './all-repo.component.html',
  styleUrl: './all-repo.component.css'
})
export class AllRepoComponent {
  dropdownOpen2: boolean = false;
  dropdownOpen1: boolean = false;
  dropdownOpen: boolean = false;
  optionsType: string[] = ['All', 'MIT', 'PRIVATE', 'PUBLIC'];
  optionsLanguage: string[] = ['All', 'Python', 'Java', 'C#', 'Angular', 'Other'];
  optionsSort: string[] = ['Name', 'Last update'];
  searchText: string = '';
  selectType: string = "All";
  selectLangage: string = "All";
  selectSort: string = 'Name';
  filterRepositories: any = [];
  allRepositories: any = [];
  userData: any = {};
  allRepositoriesBack: any = [];

  constructor(
    private repository: RepositoriesService,
    private user: UsersService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.userData = this.user.getUser();
    this.getAllRepository();
  }

  getAllRepository() {
    this.repository.getAllRepository(this.userData, 'basic').subscribe((res: any) => {
      if (res.status) {
        this.allRepositories = res.data.map((item: any) => ({...item, dateOfModifide: new Date(item.dateOfModifide)}));
        this.allRepositoriesBack = this.allRepositories;
      } else {
        this.toastr.warning('Unable to get repository');
      }
    })
  }

  filterItems() {
    if (this.searchText.length > 1) {
      this.allRepositories = this.allRepositories.filter((item: any) => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().includes(this.searchText.toLowerCase());
        })
      });
    } else {
      this.getAllRepository();
    }
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

  selectType1(item: any) {
    this.selectType = item;
    this.dropdownOpen2 = false;
    localStorage.removeItem('selectType')
    localStorage.setItem('selectType', JSON.stringify({selectType: this.selectType}));

    this._filterRepository();
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

  selectLanguage(item: any) {
    this.selectLangage = item;
    this.dropdownOpen1 = false;
    localStorage.removeItem('selectLanguage')
    localStorage.setItem('selectLanguage', JSON.stringify({selectLanguage: this.selectLangage}))

    this._filterRepository();
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

  selectOption(item: any) {
    if (item === 'Name') {
      this.selectSort = item;
      localStorage.removeItem('selectOption')
      localStorage.setItem('selectOption', JSON.stringify({selectOneOptions: false, selectTwoOptions: true}));

      this.allRepositories = this._sortByName(this.allRepositories);
    } else {
      this.selectSort = item;
      localStorage.removeItem('selectOption')
      localStorage.setItem('selectOption', JSON.stringify({selectOneOptions: true, selectTwoOptions: false}));
      this.allRepositories = this.allRepositories.sort((a: any, b: any) => b.dateOfModifide.getTime() - a.dateOfModifide.getTime());
    }
    this.dropdownOpen = false;
  }

  _filterRepository() {
    if (this.selectLangage === 'All' && this.selectType === 'All') {
      this.getAllRepository()
    } else {
      let filter: any = {};
      if (this.selectLangage !== 'All') {
        filter['typeLanguage'] = this.selectLangage;
      }
      if (this.selectType !== 'All') {
        filter['typeLicense'] = this.selectType;
      }
  
      this.allRepositories = this._filterObjekata(filter)
    }
  }

  _filterObjekata(filterKriterijumi: any) {
    return this.allRepositoriesBack.filter((objekat: any) => {
        for (let kriterijum in filterKriterijumi) {
            if (objekat[kriterijum] !== filterKriterijumi[kriterijum]) {
                return false;
            }
        }
        return true;
    });
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
}
