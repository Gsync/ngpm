import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  projectId: number;
  currentProject$: Observable<Project>;
  private routeSubscription: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.currentProject$ = this.getProjectById(this.projectId);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  getProjectById(id: number) {
    return this.dataService.getProjectById(id);
  }
}
