import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  private API_URL = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getIsueByRepository(id: string) {
    return this.http.get(this.API_URL + 'issues/' + id)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }
        return {status: true, data: res.data}
      }))
  }

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

  filter(status: any, user: any, projectId: any, params: any) {
    return this.http.get(this.API_URL + 'filter/' + status + '/' + user + '/' + params + '/' + projectId)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res}
      }))
  }

  saveIssue(item: any) {
    return this.http.post(this.API_URL + 'add-issue', item)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res}
      }))
  }

  getAllCommentByIssue(id: any) {
    return this.http.get(this.API_URL + 'issue/' + id)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res.data}
      }))
  }

  saveIssueComment(item: any) {
    return this.http.post(this.API_URL + 'add-issue-comment', item)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res}
      }))
  }

  closeIssues(item: any) {
    return this.http.put(this.API_URL + 'close-issue', item)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res.data}
      }))
  }

  assignedIssue(item: any) {
    return this.http.put(this.API_URL + 'assigne-issue', item)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res.data}
      }))
  }

  updateIssue(item: any) {
    return this.http.put(this.API_URL + 'update-issue', item)
      .pipe(map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false}
        }

        return {status: true, data: res.data}
      }))
  }

  _checkResponse(res: any) {
    if (res.message === undefined) return true;
    
    if (res.message === 'SUCCESS') return true

    return false;
  }
}
