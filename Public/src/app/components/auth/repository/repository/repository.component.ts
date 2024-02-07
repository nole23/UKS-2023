import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoriesService } from '../../../../services/repositories.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent {
  listProject: any;
  viewId: any;
  repoId: any;
  issueId: any;
  rootTree: any;
  branch: any;
  tree: any;
  tab: any = null;

  constructor(private route: ActivatedRoute, private repository: RepositoriesService) {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      
      let idRepository = params.get('repositoryId');
      this.getRpository(idRepository, params.get('type'));
      
    });
  }

  getRpository(id: any, type: any) {
    this.repository.getRepositoryById(id).subscribe((res: any) => {
      if (res.status) {
        localStorage.setItem('project', JSON.stringify(res.data));
        this.tab = type;
      } else {
        console.log('Nije mogao da pronadje repositori sa datim ID')
      }
    })
  }
}
