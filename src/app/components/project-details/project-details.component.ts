import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  projectId: number;
  currentProject: Project;
  private routeSubscription: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // TODO: Find out the draw back of nested subscriptions and how to avoid
    this.routeSubscription = this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      if (this.projectId !== null && this.projectId !== undefined) {
        this.getProjectById(this.projectId).subscribe(data => {
          this.currentProject = data;
        });
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  getProjectById(id: number) {
    return this.dataService.getProjectById(id);
  }
  createNewDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '450px',
      data: this.currentProject
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.currentProject = data;
        console.log('this dialog was closed', this.currentProject);
      }
    });
  }
}
