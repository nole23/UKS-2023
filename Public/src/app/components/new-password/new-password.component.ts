import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  password: string = '';
  password1: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {}
  
  createNewPassword() {
    if (this._isCheckData()) {
      // this.authService.saveNewPassword(this.password).subscribe((res: any) => {
      //   if (res['message'] === 'success') {
      //     this.router.navigate(['/']);
      //   } else {
      //     this.toastr.info(res['message']);
      //   }
      // })
      this.router.navigate(['/']);
    }
  }

  _isCheckData() {
    if (this.password.trim() === '') {
      this.toastr.info('Morate unjeti password');
      return false
    }

    if (this.password1.trim() === '') {
      this.toastr.info('Morate unjeti password');
      return false
    }

    if (this.password !== this.password1) {
      this.toastr.info('Prva i druga sifra moraju da se pokalapju. Pokusajte ponovo');
      return false
    }

    return true;
  }
}
