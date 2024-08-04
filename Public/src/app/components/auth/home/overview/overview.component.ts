import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  @Input() allRepositories: any = [];

  optionsLanguage: {id: string, color: string}[] = [
    {id: 'Python', color: '#3572A5'}, 
    {id: 'Java', color: '#007396'}, 
    {id: 'C#', color: '#178600'}, 
    {id: 'Angular', color: '#DD0031'}, 
    {id: 'Other', color: ''}
  ];
  
  licenseRepository: string[] = ['MIT', 'PRIVATE', 'PUBLIC'];
  optionslicence: {id: string, type: string}[] = [
    {id: 'MIT', type: 'fa fa-balance-scale'}, 
    {id: 'PRIVATE', type: 'fa fa-lock'}, 
    {id: 'PUBLIC', type: 'fa fa-unlock-alt'}
  ];

  getColor(key: string, type: string) {
    if (type === 'language') {
      const color = this.optionsLanguage.find(o => o.id === key),
      definiteColor = color ? color.color : 'black';

      return `color: ${definiteColor}`;
    }
    else {
      const icon = this.optionsLanguage.find(o => o.id === key),
      definiteIcon = icon ? icon.color : '';

      return definiteIcon;
    }
  }
}
