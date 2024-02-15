import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RepositoriesService } from '../../../../services/repositories.service';

@Component({
  selector: 'app-add-issues',
  templateUrl: './add-issues.component.html',
  styleUrl: './add-issues.component.css'
})
export class AddIssuesComponent {
  @Input() idRepository: any = {};
  @Output() dataToSend: EventEmitter<any> = new EventEmitter();
  addLabels: any = null; 
  labels: any = [];
  name: string = '';
  description: string = '';

  constructor(private repository: RepositoriesService) {}

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
  }

  setLabels(item: any) {
    this.addLabels = item;
  }

  addIssue() {
    if (this.name === '') {
      return;
    } else if (this.description === '') {
      return;
    } else {
      const issue = {
        'name': this.name,
        'description': this.description,
        'id': this.idRepository,
        'labels': this.addLabels === null ? null : this.addLabels.name,
        'user': localStorage.getItem('user')
      }
      
      this.repository.saveIssue(issue).subscribe((res: any) => {
        if (res.status) {
          this.dataToSend.emit(res.data.data);
        } else {
          console.log('nema podataka sa servera')
        }
      })
    }
  }
}
