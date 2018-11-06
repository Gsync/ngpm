import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable, of } from 'rxjs';
import { Resource } from '../models/resource';
import { Activity } from '../models/activity';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projects: Project[];
  private projectsUrl = 'http://localhost:4000/api/projects';

  private resourcesUrl = '/api/resources';

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    if (this.projects) {
      return of(this.projects);
    }
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      tap(data => (this.projects = data)),
      tap(data => console.log('getprojects from service: ', data))
    );
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
      return this.updateActivity(projectId, activity); // TODO: to be added
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

  updateActivity(projectId: string, activity: Activity) {
    return this.http.put(
      `${this.projectsUrl}/${projectId}/activity/${activity._id}`,
      activity,
      {
        headers: this.headers
      }
    );
  }

  deleteActivity(projectId: string, activityId: string) {
    return this.http.delete(
      `${this.projectsUrl}/${projectId}/activity/${activityId}`,
      {
        headers: this.headers
      }
    );
  }

  getProjectById(id: string): Observable<Project> {
    if (this.projects) {
      const foundProject = this.projects.find(project => project._id === id);
      if (foundProject) {
        return of(foundProject);
      }
    }
    return this.http
      .get(this.projectsUrl + '/' + id)
      .pipe(tap(data => console.log('getprojectbyid from service: ', data)));
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
