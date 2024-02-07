import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  repositoryData: any = null;
  tree: any = {};
  isTreeEmpty: boolean = false;
  selectedOption: any = null;
  type: any;
  childrenFolder: any;
  treeName: any = [];
  isOpenFile: boolean = false;
  fileData: any = null;

  constructor(private route: ActivatedRoute) {
    this.type = null;
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let pr = localStorage.getItem('project');
      if (pr) {
        this.repositoryData = JSON.parse(pr);
        this.selectedOption = this.repositoryData.rootTree[0];
        this.childrenFolder = this.selectedOption;
        this.treeName = [this.repositoryData.name];
        this.treeName.push(this.childrenFolder.nameBranch);
      }
    });
  }

  sizeList(list: any) {
    if (list !== undefined) {
      return list.length
    }
  }

  timeAgo(createdDate: any) {
    const currentDate = new Date();
    const createdTime = new Date(createdDate).getTime();
    const currentTime = currentDate.getTime();
    const differenceInMilliseconds = currentTime - createdTime;

    // Konvertovanje milisekundi
    const seconds = differenceInMilliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4.345; // Prosečan broj nedelja u mesecu
    const years = months / 12;

    if (seconds < 60) {
        return 'Just now';
    } else if (minutes < 60) {
        return `${Math.floor(minutes)} minutes ago`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} hours ago`;
    } else if (days < 7) {
        return `${Math.floor(days)} days ago`;
    } else if (weeks < 4.345) {
        return `${Math.floor(weeks)} weeks ago`;
    } else if (months < 12) {
        return `${Math.floor(months)} months ago`;
    } else {
        return `${Math.floor(years)} years ago`;
    }
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    // Ovde možete da radite šta god treba sa izabranom vrednošću
    console.log('Izabrana vrednost:', value);
    // Na primer, pozivanje neke metode sa izabranom vrednošću
    this.selectedOption = value;
  }

  openTree(tree: any) {
    this.tree = tree;
    
    return this.tree.nameBranch
  }

  openBranch(branch: string) {
    this.isTreeEmpty = Object.keys(this.tree).length !== 0;
    return branch
  }

  openFolder(file: any) {
    this.childrenFolder = file;
    this.treeName.push(file.nameNode);
  }

  openMasterFolder(item: any) {

    if (this.selectedOption.nameBranch === item) {
      console.log('postoji')
    } else {
      if (this.treeName[0] === item) {
        this.selectedOption = this.repositoryData.rootTree[0];
        this.childrenFolder = this.selectedOption;
        this.treeName = [this.repositoryData.name];
        this.treeName.push(this.childrenFolder.nameBranch);
      } else {
        if (this.treeName[this.treeName.length - 1] !== item) {
          let newObject = this.findFolder(this.selectedOption.childrenFolder, item);
          if (newObject === 0) {
            this.selectedOption = this.repositoryData.rootTree[0];
            this.childrenFolder = this.selectedOption;
            this.treeName = [this.repositoryData.name];
            this.treeName.push(this.childrenFolder.nameBranch);
          } else {
            const index = this.treeName.findIndex((i: any) => i === item);
            
            if (index !== -1) {
              this.treeName = this.treeName.slice(0, index + 1);
              this.childrenFolder = newObject;
            } else {
              this.selectedOption = this.repositoryData.rootTree[0];
              this.childrenFolder = this.selectedOption;
              this.treeName = [this.repositoryData.name];
              this.treeName.push(this.childrenFolder.nameBranch);
            }
          }
        } 
      }
      
    }
  }

  findFolder(childrenFolder: any, item: any) {
    return childrenFolder.find((children: any) => {
      if (children.nameNode === item) {
        return this.treeName.indexOf(children.nameNode);
      } else {
        return this.findFolder(children.childrenFolder, item);
      }
    });
  }

  onEmit(data: any) {
    const responseData = JSON.parse(data);
    if (responseData.type === 'add') {

      if (responseData.newFolder !== null) {
        this.treeName.push(responseData.newFolder)
      } else {
        this.openMasterFolder(responseData.link)
      }

      let test = this.getData(responseData.data, responseData.link);
      this.childrenFolder.files = test.files;
      
      
      this.type = null;
    } else if (responseData.type === 'navigation') {
      this.openMasterFolder(responseData.link)
      this.type = null;
    } else {
      this.type = null;
    }
  }

  getData(data: any, link: any) {
    if (data.rootTree === link) {
      return data.rootTree.files;
    } else {
      return this.getDataHelper(data.rootTree.childrenFolder, link);
    }
  }

  getDataHelper(data: any, link: any) {
    let test = data.find((x: any) => x.nameNode === link);

    if (test === undefined) {
      for(const d of data) {
        test = this.getDataHelper(d.childrenFolder, link);
        if (test !== undefined) {
          break;
        }
      }
    }
    return test;
  }

  openFile(item: any) {
    this.isOpenFile = true;
    this.fileData = item;
  }

  backToFolder() {
    this.isOpenFile = false;
    this.fileData = null;
  }

  ngParserText(text: any) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }
}
