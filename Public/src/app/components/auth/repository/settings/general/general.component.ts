import { Component, Input } from '@angular/core';
import { RepositoriesService } from '../../../../../services/repositories.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
  @Input() repositoryData: any = {};

  constructor(private repository: RepositoriesService) { }

  rename() {
    this.repository.updateRepository(this.repositoryData, 'general')
      .subscribe((res: any) => {
        console.log(res)
      });
    console.log(this.repositoryData)
  }
}
