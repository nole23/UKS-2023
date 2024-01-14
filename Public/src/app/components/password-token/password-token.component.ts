import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-token',
  templateUrl: './password-token.component.html',
  styleUrl: './password-token.component.css'
})
export class PasswordTokenComponent {

  token: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {}
  
  verifyToken() {
    if (this._isCheckData()) {
      // this.authService.restartPassword(this.email).subscribe((res: any) => {
      //   if (res['message'] === 'success') {
      //     this.router.navigate(['/paswword-token']);
      //   } else {
      //     this.toastr.info(res['message']);
      //   }
      // })
      this.router.navigate(['/new-password']);
    }
  }

  _isCheckData() {
    if (this.token.trim() === '') {
      this.toastr.info('Morate unjeti token');
      return false
    }

    return true;
  }
}
