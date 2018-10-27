import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projectsUrl = 'http://localhost:4000/api/projects';

  private resourcesUrl = '/api/resources';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourcesUrl);
  }

  saveProject(project: Project) {
    if (project._id) {
      return this.updateProject(project);
    } else {
      project.priority = 1;
      project.status = 1;
      project.activities = [];
      return this.createProject(project);
    }
  }

  saveResource(resource: Resource) {
    if (resource.id) {
      return this.updateResource(resource);
    } else {
      resource.activityId = null;
      return this.createResource(resource);
    }
  }

  createResource(resource: Resource) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('creating resource: ', resource);
    return this.http.post(this.resourcesUrl, resource, { headers });
  }
  updateResource(resource: Resource) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('updating project: ', resource);
    return this.http.put(this.resourcesUrl + '/' + resource.id, resource, {
      headers
    });
  }

  createProject(project: Project) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('creating project: ', project);
    return this.http.post(this.projectsUrl, project, { headers });
  }
  updateProject(project: Project) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('updating project: ', project);
    return this.http.put(this.projectsUrl + '/' + project._id, project, {
      headers
    });
  }
  getProjectById(id: string): Observable<Project> {
    return this.http.get(this.projectsUrl + '/' + id);
  }
  getResourceById(id: number): Observable<Resource> {
    return this.http.get(this.resourcesUrl + '/' + id);
  }
}
