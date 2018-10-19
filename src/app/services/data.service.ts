import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '../models/resource';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projectsUrl = '/api/projects';
  private resourcesUrl = '/api/resources';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }
  getProjectById(id: number): Observable<Project> {
    return this.http.get(this.projectsUrl + '/' + id);
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourcesUrl);
  }
}
