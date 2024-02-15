import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getUser() {
    try {
      const storedItem = localStorage.getItem('user');
      return storedItem ? JSON.parse(storedItem) : null;
    } catch(e) {
      return {};
    }
  }

  getUserInformation(user: any) {
    return this.http.get(this.API_URL + 'user-information/' + user.id)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res.data.userInformation}
      }))
  }

  updateProfile(user: any) {
    return this.http.put(this.API_URL + 'user-edit', user)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          const user = res.data.user;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(user));
          return {status: false}
        }

        return {status: true}
      }))
  }

  _checkResponse(res: any) {
    if (res.message === undefined) return true;
    
    if (res.message === 'SUCCESS') return true

    return false;
  }
}
