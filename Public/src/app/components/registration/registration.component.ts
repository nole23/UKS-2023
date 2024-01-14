import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  passwordAgine: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {}

  
  registration(): void {
    if (this._isCheckData()) {
      this.authService.registration(this.firstName, this.lastName, this.password, this.email).subscribe((res: any) => {
        if (!res.status) {
          this.toastr.info(res.message);
        } else {
          this.router.navigate(['/login']);
        }
      }, (error: string) => {
        this.toastr.error(error);
      });
    }
  }

  _isCheckData() {
    if (this.firstName.trim() === '') {
      this.toastr.info('Ime mora biti popunjeno');
      return false
    }

    if (this.lastName.trim() === '') {
      this.toastr.info('Prezime mora biti popunjena');
      return false;
    }

    if (this.password.trim() === '') {
      this.toastr.info('Sifra mora biti popunjena');
      return false;
    }

    if (this.passwordAgine.trim() === '') {
      this.toastr.info('Unesite ponovo vasu sifru');
      return false;
    }

    if (this.password !== this.passwordAgine) {
      this.toastr.info('Sifre se ne podudaraju, provjerite vase sifre');
      return false;
    }

    if (this.email.trim() === '') {
      this.toastr.info('Email mora biti popunjena');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.toastr.info('Email mora biti pravilno napisan, mora biti u formatu korisnik@domen.com');
      return false;
    }
    return true;
  }
}
