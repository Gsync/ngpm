import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projectsUrl = 'http://localhost:4000/api/projects';

  private resourcesUrl = '/api/resources';

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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
    console.log('creating resource: ', resource);
    return this.http.post(this.resourcesUrl, resource, {
      headers: this.headers
    });
  }
  updateResource(resource: Resource) {
    console.log('updating project: ', resource);
    return this.http.put(this.resourcesUrl + '/' + resource.id, resource, {
      headers: this.headers
    });
  }

  createProject(project: Project) {
    console.log('creating project: ', project);
    return this.http.post(this.projectsUrl, project, { headers: this.headers });
  }
  updateProject(project: Project) {
    console.log('updating project: ', project);
    return this.http.put(this.projectsUrl + '/' + project._id, project, {
      headers: this.headers
    });
  }
  saveActivity(projectId: string, activity: Activity) {
    if (activity._id) {
      return null; // TODO: to be added
    } else {
      return this.addActivity(projectId, activity);
    }
  }

  addActivity(projectId: string, activity: Activity) {
    console.log('adding activity to projectid : ', projectId);
    return this.http.put(
      `${this.projectsUrl}/${projectId}/activity/add`,
      activity,
      {
        headers: this.headers
      }
    );
  }

  updateActivity(projectId: string, activityId: string) {}

  deleteActivity(projectId: string, activityId: string) {
    return this.http.delete(
      `${this.projectsUrl}/${projectId}/activity/${activityId}`,
      {
        headers: this.headers
      }
    );
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get(this.projectsUrl + '/' + id);
  }
  getResourceById(id: number): Observable<Resource> {
    return this.http.get(this.resourcesUrl + '/' + id);
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete(this.projectsUrl + '/' + id, {
      headers: this.headers
    });
  }
}
