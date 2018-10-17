import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Resource } from 'src/app/models/resource';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {
  resources$: Observable<Resource[]>;
  displayedColumns: string[] = [
    'name',
    'designation',
    'email',
    'phone',
    'actions'
  ];
  constructor(private dataService: DataService, private store: Store<any>) {}

  ngOnInit() {
    this.resources$ = this.dataService.getResources();
    this.resources$.subscribe(data => {
      this.store.dispatch({
        type: 'LOAD_RESOURCES',
        payload: data
      });
    });
  }
}
