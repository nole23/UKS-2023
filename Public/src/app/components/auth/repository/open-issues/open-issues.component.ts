import { Component, Input } from '@angular/core';
import { RepositoriesService } from '../../../../services/repositories.service';

@Component({
  selector: 'app-open-issues',
  templateUrl: './open-issues.component.html',
  styleUrl: './open-issues.component.css'
})
export class OpenIssuesComponent {
  @Input() issue: any = null;

  addLabels: any = null;
  labels: any = [];
  isAssigned: Boolean = false;
  isDisable: Boolean = false;
  user: any = null;
  comment: any = '';
  issueNameHelp: any = null;
  issueDescriptionHelp: any = null;

  constructor(private repository: RepositoriesService) {
    const us = localStorage.getItem('user');
    if (us) {
      this.user = JSON.parse(us);
    }
  }

  ngOnInit() {
    this.labels = [
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
    ]

    this.addLabels = this.issue.labels ? this.labels.find((x: any) => x.name === this.issue.labels) : null;

    this.isDisable = !this.issue.status;

    this.repository.getAllCommentByIssue(this.issue.id).subscribe((res: any) => {
      if (res.status) {

        this.issue.comments = res.data;
        this.isAssigned1();
        this.getModalData();
      } else {
        console.log('server ne radi')
      }
    })
  }

  getModalData() {
    this.issueNameHelp = this.issue.name;
    this.issueDescriptionHelp = this.issue.description;
  }

  updateIssue() {
    const updateIssue = {
      data: {
        id: this.issue.id,
        name: this.issueNameHelp,
        description: this.issueDescriptionHelp
      },
      user: this.user
    }

    this.repository.updateIssue(updateIssue)
      .subscribe((res: any) => {
        if (res.status) {
          this.issue.comments.push(res.data);
          this.updateIssueProject()
        } else {
          console.log('serrver nije dostupan');
        }
      })
  }

  updateIssueProject() {
    this.issue.name = this.issueNameHelp;
    this.issue.description = this.issueDescriptionHelp;
    this.destroyData();
  }

  destroyData() {
    this.issueNameHelp = this.issue.name;
    this.issueDescriptionHelp = this.issue.description;
  }

  assignedUser() {
    const assignedIssue = {
      data: {
        id: this.issue.id
      },
      user: this.user
    }
    this.repository.assignedIssue(assignedIssue)
      .subscribe((res: any) => {
        if (res.status) {
          this.issue.assigned.push(this.user)
          this.issue.comments.push(res.data);
          this.isAssigned1()
        } else {
          console.log('server ne radi')
        }
      })
  }

  usAssignedUser() {
    const assignedIssue = {
      data: {
        id: this.issue.id
      },
      user: this.user
    }
    this.repository.unAssignedIssue(assignedIssue)
      .subscribe((res: any) => {
        if (res.status) {
          let index = this.issue.assigned.findIndex((user: any) => user.id === this.user.id);

          if (index !== -1) {
            this.issue.assigned.splice(index, 1);
          }
          this.issue.comments.push(res.data);
          this.isUnAssigned()
        } else {
          console.log('server ne radi')
        }
      })
  }

  isUnAssigned() {
    if (this.issue.assigned.length > 0) {
      this.isAssigned = false;
    }
  }

  isAssigned1() {
    if (this.issue.assigned.length > 0) {
      this.isAssigned = true;
    }
  }

  setLabels(item: any) {
    this.addLabels = item;
    this.issue.labels = item.name;
    this.repository.setLabel(this.issue, this.user.id).subscribe((res: any) => {
      console.log(res)
      this.issue.comments.push(res.data);
    })
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

  isOwner(user: any) {
    return user.id.toString() === this.user.id.toString();
  }

  ngCloseIssue(issue: any) {

    const closeIssue = {
      data: {
        id: this.issue.id
      },
      user: this.user
    }

    this.repository.closeIssues(closeIssue)
      .subscribe((res: any) => {
        if (res.status) {
          this.issue.comments.push(res.data);
        } else {
          console.log('server nije dostupan')
        }
      })
  }

  isDisableAddComment() {
    return !(!this.isDisable && (this.comment !== null && this.comment.length > 0));
  }

  ngComment() {
    const issueComment = {
      data: {
        id: this.issue.id,
        comment: this.comment,
      },
      user: this.user
    }

    this.repository.saveIssueComment(issueComment)
      .subscribe((res: any) => {
        if (res.status) {
          this.issue.comments.push(res.data.data)
          this.comment = null
        } else {
          console.log('nije mogao da dodam iz nekog razloga')
        }
      })
  }

  changeText(text: String) {
    return text.length > 30 ? text.substring(0, 30) + '...' : text;
  }
}
