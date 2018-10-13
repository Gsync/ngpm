import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  private projectsUrl = '/api/projects';

  constructor(private http: HttpClient) {}

  ngOnInit() {}
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }
}
