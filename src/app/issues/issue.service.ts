import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class IssueService {
  private issues: Issue[];
  private issueUrl = 'http://localhost:4000/api/issues';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    if (this.issues) {
      return of(this.issues);
    }
    return this.http.get<Issue[]>(this.issueUrl).pipe(
      tap(data => (this.issues = data)),
      tap(data => console.log('getissues from service: ', data))
    );
  }
  saveIssue(issue: Issue) {
    if (issue._id) {
      return this.updateissue(issue);
    } else {
      return this.createissue(issue);
    }
  }

  createissue(issue: Issue) {
    console.log('creating issue: ', issue);
    return this.http
      .post(this.issueUrl, issue, {
        headers: this.headers
      })
      .pipe(
        tap(data => console.log('createIssue: ', data)),
        tap(data => this.issues.push(data))
      );
  }
  updateissue(issue: Issue) {
    console.log('updating project: ', issue);
    return this.http.put(this.issueUrl + '/' + issue._id, issue, {
      headers: this.headers
    });
  }
  deleteIssue(id: string): Observable<Issue> {
    return this.http
      .delete(this.issueUrl + '/' + id, {
        headers: this.headers
      })
      .pipe(
        tap(data => console.log('deleteissue: ', data)),
        tap(data => {
          const foundIndex = this.issues.findIndex(issue => issue._id === id);
          if (foundIndex > -1) {
            this.issues.splice(foundIndex, 1);
          }
        })
      );
  }
}
