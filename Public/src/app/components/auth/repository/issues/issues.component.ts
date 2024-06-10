import { Component, ViewChild, ElementRef } from '@angular/core';
import { RepositoriesService } from '../../../../services/repositories.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.css'
})
export class IssuesComponent {
  @ViewChild('formcontrol') form: ElementRef | undefined;
  userInProject: any = [];
  project: any = null;
  allIssue: any = 0;
  active: any = 0;
  finish: any = 0;
  isAddIssue: boolean = false;
  isInfoIssue: boolean = false;
  isTypeIssue: boolean = true;
  oneIssue: any = null;
  originalIssue: any = [];
  labels: any = [
    {
      name: 'Bug',
      color: 'red-class'
    },
    {
      name: 'US',
      color: 'green-class'
    },
    {
      name: 'Documentation',
      color: 'blue-class'
    },
    {
      name: 'Invalid',
      color: 'test-class'
    }
  ];

  constructor(private repository: RepositoriesService) {}

  ngOnInit() {
    let p = localStorage.getItem('project');
    
    if (p){
      this.project = JSON.parse(p);
    }

    this.allIssue = this.project.issue.length;
    this.originalIssue = this.project.issue;

    this.project.issue.forEach((element: any) => {
      if (element.status) {
        this.active = this.active + 1;
      } else {
        this.finish = this.finish + 1;
      }
    });

    this.userInProject = this.project.listUser;
  }

  ngFilterStatus() {
    if (this.form) {
      let status = this.form.nativeElement.children['select'].children['value'].value;
      let nameUser = this.form.nativeElement.children['author'].children['value'].value;

      

      if (status === 'null' && nameUser === 'null') {
        if (this.originalIssue.length > 0) {
          this.project.issue = this.originalIssue;
        }
      } else {
        let statusS = status !== 'null' ? status : null;
        let userN = nameUser !== 'null' ? nameUser : null;
        
        this.project.issue = this._filterList(JSON.parse(statusS), userN);
      }
    }
  }

  _filterList(status: boolean | null, author: any | null) {
    return this.originalIssue.filter((item: any) => {
      // Provera statusa ako je zadat
      if (status !== null && item.status !== status) {
        return false;
      }
      // Provera autora ako je zadat
      if (author !== null && item.user.id !== author) {
        return false;
      }
      return true; // Ako element zadovoljava sve uslove, vraća se u rezultat
    });
  }

  openIssue(statusIssue: any) {
    if (statusIssue === 'open') {
      this.isTypeIssue = true;
    }
    if (statusIssue === 'close') {
      this.isTypeIssue = false;
    }
  }

  handleReceivedData(receivedData: any) {
    this.isAddIssue = false;
    this.project.issue.unshift(receivedData);
  }

  openIssueInformation(item: any) {
    this.isAddIssue = true;
    this.isInfoIssue = true;
    this.oneIssue = item;
  }

  setColor(color: any) {
    if (color !== null) {
      let color1 = this.labels.find((x: any) => x.name === color);
      return color1.color
    }
    return null;
  }
}
