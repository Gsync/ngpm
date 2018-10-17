import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;
  constructor(private dataService: DataService, private store: Store<any>) {}

  ngOnInit() {
    this.projects$ = this.dataService.getProjects();
    this.projects$.subscribe(data => {
      this.store.dispatch({
        type: 'LOAD_PROJECTS',
        payload: data
      });
    });
  }
}
