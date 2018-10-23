import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '../models/resource';
import { RequestOptions, Headers } from '@angular/http';

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

  saveProject(project: Project) {
    if (project.id) {
      return this.updateProject(project);
    } else {
      project.priority = 1;
      project.status = 1;
      project.activities = [];
      return this.createProject(project);
    }
  }

  createProject(project: Project) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('creating project: ', project);
    return this.http.post(this.projectsUrl, project, { headers });
  }
  updateProject(project: Project) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('updating project: ', project);
    return this.http.put(this.projectsUrl + '/' + project.id, project, {
      headers
    });
  }
  getProjectById(id: number): Observable<Project> {
    return this.http.get(this.projectsUrl + '/' + id);
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourcesUrl);
  }
}
