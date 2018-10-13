import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  private projects: Project[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProjects().subscribe(data => {
      this.projects = data;
      console.log(this.projects);
    });
  }
}
