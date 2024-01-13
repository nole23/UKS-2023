import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService) {}

  login(): void {
    if (this._isCheckData()) {
      this.authService.login(this.username, this.password).subscribe((res: string) => {
        // Ovde možete obraditi odgovor sa servera, npr. čuvanjem tokena u lokalnom skladištu
        console.log('Login successful', res);
      }, (error: string) => {
        console.error('Login failed', error);
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
