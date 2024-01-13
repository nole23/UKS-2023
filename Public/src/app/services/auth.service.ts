import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): any {
    return {};
  }

  restartPassword(email: string): any {
    return {status: 'success'}
  }

  isLoggedIn() {
    return false;
  }
}
