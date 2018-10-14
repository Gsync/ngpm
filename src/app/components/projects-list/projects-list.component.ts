import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  private projects$: Observable<Project[]>;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.projects$ = this.dataService.getProjects();
  }
}
