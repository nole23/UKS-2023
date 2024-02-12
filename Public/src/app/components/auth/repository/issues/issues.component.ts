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

  constructor(private repository: RepositoriesService) {}

  ngOnInit() {
    let p = localStorage.getItem('project');
    
    if (p){
      this.project = JSON.parse(p);
    }

    this.allIssue = this.project.issue.length;

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

      this.repository.filter(status, nameUser, this.project.id, 'status')
        .subscribe((res: any) => {
          if (res.status) {
            console.log(res.data)
          }
        })
    }
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
}
