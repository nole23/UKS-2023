import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8000/';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(username: string, password: string): any {
    return this.http.post(this.API_URL + 'login', {username: username, password: password})
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false, message: this._getErrorMessage(res.data)}
        }
        const user = res.data.user;
        const jwt = res.data.jwt;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwt', JSON.stringify(jwt));

        return {status: true}
      }))
  }

  registration(firstName: string, lastName: string, password: string, email: string): any {
    return this.http.post(this.API_URL + 'registration', {firstName: firstName, lastName: lastName, password: password, email: email})
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false, message: this._getErrorMessage(res.data)}
        }
        return {status: true}
      }))
  }

  restartPassword(email: string): any {
    return {status: 'success'}
  }

  isLoggedIn() {
    if (localStorage.getItem('jwt')) {
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }

  _checkResponse(res: any) {
    if (res.message === undefined) return true;
    
    if (res.message === 'SUCCESS') return true

    return false;
  }

  _getErrorMessage(message: string) {
    if (message === 'PASSWORD_NOT_FOUND') {
      return 'Sifra nije ispravna, probajte ponovo'
    } else if (message === 'USER_NOT_FOUND') {
      return 'Korisnicko ime nije ispravno, probajte ponovo'
    } else if (message === 'NOT_SAVE_MAIL') {
      return 'Korisnik sa ovim mailom je vec dodat u bazu, probajte restartovati sifru'
    } else {
      return 'Korisnik nije pronadjen u bazi, da li ste sigurni da su kredencijali ispravni'
    }
  }
}
