import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ActivityFormComponent } from '../activity-form/activity-form.component';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  @Input()
  project: Project;
  dataSource: MatTableDataSource<Activity>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  displayedColumns: string[] = [
    'title',
    'dateCreated',
    'hoursWorked',
    'percentComplete',
    'actions'
  ];
  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getActivities();
  }
  getActivities() {
    this.dataSource = new MatTableDataSource<Activity>(this.project.activities);
    this.dataSource.paginator = this.paginator;
  }

  activityDialog(activity: Activity): void {
    const dialogRef = this.dialog.open(ActivityFormComponent, {
      width: '450px',
      data: { activity: activity, currentProjectId: this.project._id }
    });
  }

  deleteActivity(activityId: string) {
    if (confirm(`Really delete this activity?`)) {
      this.dataService
        .deleteActivity(this.project._id, activityId)
        .subscribe(() => {
          // Refresh DataTable to remove activity row from datasource.
          this.deleteRowDataTable(activityId, this.paginator, this.dataSource);
        });
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable(activityId, paginator, dataSource) {
    const dsData = dataSource.data;
    const itemIndex = dsData.findIndex(obj => obj['_id'] === activityId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }
}
