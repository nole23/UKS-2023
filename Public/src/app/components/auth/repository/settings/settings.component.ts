import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  parentData = 'repository';
  currentTab = 'settings';
  repositoryData: any = null;
  openTub: string = 'general';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let pr = localStorage.getItem('project');
      if (pr) {
        this.repositoryData = JSON.parse(pr);
        console.log(this.repositoryData)
      }
    });
  }

  openTab(tab: string) {
    this.openTub = tab;
  }
}
