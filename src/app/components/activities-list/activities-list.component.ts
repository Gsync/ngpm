import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  // FIXME Performance issue while switching from details to activites
  @Input()
  activities: Activity[];
  dataSource: MatTableDataSource<Activity>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  displayedColumns: string[] = [
    'position',
    'title',
    'dateCreated',
    'hoursWorked',
    'description',
    'actions'
  ];
  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Activity>(this.activities);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
