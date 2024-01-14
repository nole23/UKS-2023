import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  iUsername: boolean = false;
  iPassword: boolean = false;
  iSpiner: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {}

  login(): void {
    if (this._isCheckData()) {
      this.authService.login(this.username, this.password).subscribe((res: any) => {
        if (!res.status) {
          this.toastr.info(res.message);
        } else {
          this.router.navigate(['']);
        }
      }, (error: string) => {
        this.toastr.error(error);
      });
    }
  }

  _isCheckData() {
    if (this.username.trim() === '') {
      this.toastr.info('Koriscnicko ime mora biti popunjeno');
      this.iUsername = true;
      return false
    } else {
      this.iUsername = false;
    }

    if (this.password.trim() === '') {
      this.toastr.info('Sifra mora biti popunjena');
      this.iPassword = true;
      return false;
    } else {
      this.iPassword = false;
    }

    return true;
  }
}
