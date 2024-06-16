import { Component } from '@angular/core';
import { RepositoriesService } from '../../../../services/repositories.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent {
  project: any;
  tabName: String = 'options';
  isShow: boolean = false;
  isShowIssue: boolean = false;
  graph: any = null;
  graph1: any = null;
  constructor(private repository: RepositoriesService) {
    let project = localStorage.getItem('project');
    if (project) {
      this.project = JSON.parse(project);
      console.log(this.project)
    }

    
  }

  ngOnInit() {
    this.repository.getStatistic(this.project.id).subscribe((res: any) => {

      this.graph = {
        data: [
            { 
              x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
              y: res.data.count_of_ammount,
              type: 'scatter',
              mode: 'lines+points',
              marker: {color: 'red'}
            },
            {
              x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
              y: res.data.count_of_ammount,
              type: 'bar'
            },
        ],
        layout: {width: 320, height: 240, title: 'Project progress'}
      };
      this.graph1 = {
        data: [
            { 
              type: 'scatter',
              mode: 'lines+points',
              marker: {color: 'red'}
            },
            {
              x: ['Open', 'Closed'],
              y: res.data.count_of_issues,
              type: 'bar'
            },
        ],
        layout: {width: 320, height: 240, title: 'Issue progress'}
      };
    })
  }
}
