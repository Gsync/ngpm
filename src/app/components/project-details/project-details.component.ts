import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { MatDialog } from '@angular/material';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { flatMap } from 'rxjs/operators';
import { ActivityFormComponent } from '../activity-form/activity-form.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  projectId: string;
  currentProject: Project;
  routeSubscription: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params
      .pipe(
        flatMap(params => {
          if (params) {
            this.projectId = params['id'];
            return this.getProjectById(this.projectId);
          }
        })
      )
      .subscribe(data => {
        if (data) {
          this.currentProject = data;
          // NOTE: Can add store update here
        }
      });

    // NOTE: Above subscription block is the refactor of the following commented block with nested subscriptions
    //
    // this.routeSubscription = this.route.params.subscribe(params => {
    //   this.projectId = +params['id'];
    //   if (this.projectId !== null && this.projectId !== undefined) {
    //     this.getProjectById(this.projectId).subscribe(data => {
    //       this.currentProject = data;
    //     });
    //   }
    // });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  getProjectById(id: string) {
    return this.dataService.getProjectById(id);
  }

  deleteProject() {
    if (confirm(`Really delete the project: ${this.currentProject.title}?`)) {
      this.dataService.deleteProject(this.projectId).subscribe(() => {
        console.log(`${this.currentProject.title} was deleted`);
        this.router.navigateByUrl('/projects');
      });
    }
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
  activityDialog(): void {
    const dialogRef = this.dialog.open(ActivityFormComponent, {
      width: '450px',
      data: { currentProjectId: this.currentProject._id }
    });
  }
}
