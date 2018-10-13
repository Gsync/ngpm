import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Resource } from 'src/app/models/resource';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {
  private resources: Resource[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getResources().subscribe(data => {
      this.resources = data;
      console.log(this.resources);
    });
  }
}
