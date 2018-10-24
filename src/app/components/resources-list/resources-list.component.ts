import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Resource } from 'src/app/models/resource';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialog
} from '@angular/material';
import { Router } from '@angular/router';
import { ResourceFormComponent } from '../resource-form/resource-form.component';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {
  resources$: Observable<Resource[]>;
  resource: Resource;
  displayedColumns: string[] = [
    'position',
    'name',
    'designation',
    'email',
    'phone',
    'actions'
  ];
  constructor(
    private dataService: DataService,
    private store: Store<any>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  datasource: MatTableDataSource<Resource>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit() {
    this.getResources();
  }
  createNewDialog(): void {
    const dialogRef = this.dialog.open(ResourceFormComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.resource = data;
        console.log('this dialog was closed', this.resource);
        this.getResources();
      }
    });
  }
  editResource(id: number) {
    this.router.navigate([`/resources/${id}/edit`]);
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  getResources() {
    this.resources$ = this.dataService.getResources();
    this.resources$.subscribe(data => {
      this.datasource = new MatTableDataSource<Resource>(data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.store.dispatch({ type: 'LOAD_RESOURCES', payload: data });
    });
  }
}
