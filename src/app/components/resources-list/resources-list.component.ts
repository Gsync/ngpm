import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Resource } from 'src/app/models/resource';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {
  resources$: Observable<Resource[]>;
  displayedColumns: string[] = [
    'position',
    'name',
    'designation',
    'email',
    'phone',
    'actions'
  ];
  constructor(private dataService: DataService, private store: Store<any>) {}

  datasource: MatTableDataSource<Resource>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit() {
    this.resources$ = this.dataService.getResources();
    this.resources$.subscribe(data => {
      this.datasource = new MatTableDataSource<Resource>(data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.store.dispatch({
        type: 'LOAD_RESOURCES',
        payload: data
      });
    });
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
