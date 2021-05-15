import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Resource } from 'src/app/models/resource';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  ngOnInit() {
    this.getResources();
  }

  createNewDialog(resource: Resource): void {
    const dialogRef = this.dialog.open(ResourceFormComponent, {
      width: '450px',
      data: resource
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.resource = data;
        console.log('this dialog was closed', this.resource);
        this.getResources();
      }
    });
  }
  getResourceById(id: string) {
    return this.dataService.getResourceById(id);
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

  deleteResource(resource: Resource) {
    // FIXME: Does not update the table like it does in activity list, also check update resource
    if (
      confirm(
        `Really delete the resource: ${resource.firstName} ${
          resource.lastName
        }?`
      )
    ) {
      this.dataService.deleteResource(resource._id).subscribe(() => {
        console.log(`${resource.firstName} ${resource.lastName} was deleted`);
        this.router.navigateByUrl('/resources');
      });
    }
  }
}
