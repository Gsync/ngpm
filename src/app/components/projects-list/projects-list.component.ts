import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;
  loaded: boolean;
  project: Project;
  constructor(
    private dataService: DataService,
    private store: Store<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.projects$ = this.dataService.getProjects();
    this.projects$.subscribe(data => {
      console.log('newdata', data);
      this.loaded = true;
      this.store.dispatch({
        type: 'LOAD_PROJECTS',
        payload: data
      });
    });
  }

  createNewDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.project = data;
        console.log('this dialog was closed', this.project);
        this.projects$ = this.dataService.getProjects();
      }
    });
  }
}
