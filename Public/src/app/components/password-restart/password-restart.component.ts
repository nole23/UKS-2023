import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-restart',
  templateUrl: './password-restart.component.html',
  styleUrl: './password-restart.component.css'
})
export class PasswordRestartComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {}

  
  restart() {
    if (this._isCheckData()) {
      // this.authService.restartPassword(this.email).subscribe((res: any) => {
      //   if (res['message'] === 'success') {
      //     this.router.navigate(['/paswword-token']);
      //   } else {
      //     this.toastr.info(res['message']);
      //   }
      // })
      this.router.navigate(['/paswword-token']);
    }
  }

  _isCheckData() {
    if (this.email.trim() === '') {
      this.toastr.info('Email mora biti popunjen');
      return false
    }

    return true;
  }
}
