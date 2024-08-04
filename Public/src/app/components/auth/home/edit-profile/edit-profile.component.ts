import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  @Input() userData: any = null;
  @Input() isEdit: boolean = false;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  userDataBackup: any = null;

  constructor(private user: UsersService, private toastr: ToastrService) {
    if (this.userData !== null) {
      this.userDataBackup = this.userData;
    } 
  }

  save() {

    this.user.updateProfile(this.userData).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success('Your private information has been updated');
        this.isEdit = !this.isEdit;
        this.notifyParent.emit(this.isEdit);
      } else {
        this.toastr.error('Could not update your information');
      }
    })
  }

  close() {
    this.isEdit = !this.isEdit;
    this.notifyParent.emit(this.isEdit);
  }
}
