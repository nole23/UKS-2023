import { Component } from '@angular/core';

@Component({
  selector: 'app-pull-requestes',
  templateUrl: './pull-requestes.component.html',
  styleUrl: './pull-requestes.component.css'
})
export class PullRequestesComponent {
  parentData = 'repository';
  currentTab = 'pull';
}
