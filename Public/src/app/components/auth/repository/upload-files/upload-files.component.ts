import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RepositoriesService } from '../../../../services/repositories.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.css'
})
export class UploadFilesComponent {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() treeName: any = {};
  @Input() repositoryData: any = {};
  nameFolder: any;
  name: any;
  nameFile: any = '';
  isNewFolder: boolean = true;
  fileNames: Array<String>;
  file: File | null = null;
  isUpdateName: boolean = false;

  constructor(private repositoryService: RepositoriesService) {
    this.name = '';
    this.nameFolder = '';
    this.fileNames = [];
  }
  
  link(item: any) {
    const resObj = {
      type: 'navigation',
      link: item
    }
    this.notifyParent.emit(JSON.stringify(resObj));
  }

  cancel() {
    const resObj = {
      type: 'cancel'
    }
    this.notifyParent.emit(JSON.stringify(resObj));
  }

  addNewFolder() {
    this.isNewFolder = !this.isNewFolder;
  }

  uploadFile($event: any) {
    this.fileNames = [] // TODO send more files at once
    for (let i = 0; i < $event.target.files.length; i++) {
      this.fileNames = this.fileNames.concat($event.target.files[i])
    }
    this.file = $event.target.files[0]
    if (this.file) {
      this.nameFile = this.file.name;
    }
  }

  delete(index: any) {
    this.fileNames.splice(index, 1);
    this.nameFile = '';
    this.file = null;
  }

  updateName() {
    this.isUpdateName = !this.isUpdateName;
  }

  upload() {
    if (this.file !== null) {
      const formData = new FormData();
      formData.append('type', 'upload');
      let owner = this.repositoryData.listUser.find((x: any) => x.role.roleName === 'O')

      let name = owner.user.username;
      this.treeName.forEach((element: any) => {
        name += '_' + element;
      });

      if (this.nameFolder.length > 0)
        name += '_' + this.nameFolder;

      name += '_' + this.file.name
      console.log(name)

      const tree = this.treeName.slice(1, this.treeName.length);

      let data = {
        type: 'upload',
        title: name,
        folder: this.nameFolder,
        branch: 'master',
        parent: this.repositoryData.id,
        tree: tree,
        cover: this.file
      }

      let user = localStorage.getItem('user');
      if (user) {
        formData.append('user', JSON.parse(user))
      }
      formData.append('data', JSON.stringify(data))

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
    } else {
      console.log('Nije uspio da doda fajl')
    }
  }

  ngIsNull() {
    if (this.file !== null) {
      return false
    } else {
      return true
    }
  }
}
