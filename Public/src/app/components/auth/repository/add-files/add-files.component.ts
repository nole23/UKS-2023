import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RepositoriesService } from '../../../../services/repositories.service';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrl: './add-files.component.css'
})
export class AddFilesComponent {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() treeName: any = {};
  project: any = null;
  body: any;
  isSpiner: Boolean = false;
  name: any;
  nameFolder: any;
  user: any;

  constructor(private repositoryService: RepositoriesService) {
    this.body = '';
    this.name = '';
    this.nameFolder = '';
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    let pr = localStorage.getItem('project');
    if (pr) {
      this.project = JSON.parse(pr);
    }
  }

  createFile() {
    this.isSpiner = true;
    if (this.body !== '' && this.name !== '') {
      const tree = this.treeName.slice(1, this.treeName.length);
      const formData = new FormData();
      let data = {
        type: 'create',
        title: this.name,
        folder: this.nameFolder,
        branch: 'master',
        text: this.body,
        parent: this.project.id,
        tree: tree
      }
      formData.append('data', JSON.stringify(data))
      formData.append('user', this.user)

      this.repositoryService.saveFile(formData)
        .subscribe((res: any) => {
          if (res.status) {
            const resObj = {
              type: 'add',
              data: res.data,
              link: tree[tree.length - 1],
              newFolder: this.nameFolder ? this.nameFolder : null
            }
            this.notifyParent.emit(JSON.stringify(resObj));
          } else {
            console.log('Nije uspio da dodam novi dokument')
          }
        })
    }
    else {
      this.isSpiner = false;
    }
  }
  
  ngIsNull() {
    if (this.body !== '' && this.name !== '') {
      return false
    } else {
      return true
    }
  }

  cancel() {
    const resObj = {
      type: 'cancel'
    }
    this.notifyParent.emit(JSON.stringify(resObj));
  }

  link(item: any) {
    const resObj = {
      type: 'navigation',
      link: item
    }
    this.notifyParent.emit(JSON.stringify(resObj));
  }
}
