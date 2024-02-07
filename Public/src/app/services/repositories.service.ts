import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  private API_URL = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getRepositoryById(id: string): any {
    return this.http.get(this.API_URL + 'repository/' + id )
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false};
        }

        return {status: true, data: res.project};
      }))
  }

  getAllRepository(user: any): any {
    return this.http.get(this.API_URL + 'all-repository/' + user.id)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res.data}
      }))
  }

  addNewRepository(repository: any): any {
    return this.http.post(this.API_URL + 'new-repository', repository)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res}
      }))
  }

  saveFile(file: any) {
    return this.http.post(this.API_URL + 'files', file)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res}
      }))
  }

  _checkResponse(res: any) {
    if (res.message === undefined) return true;
    
    if (res.message === 'SUCCESS') return true

    return false;
  }
}
