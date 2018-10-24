import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resource } from 'src/app/models/resource';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  formTitle: string;
  resource: Resource;
  constructor(
    private dialogRef: MatDialogRef<ResourceFormComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public dialogData: Resource,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      this.formTitle = 'Edit Resource';
      this.resource = this.dialogData;
    } else {
      this.formTitle = 'Add New Resource';
      this.resource = <Resource>{};
    }
  }
  onSave() {
    this.dataService.saveResource(this.resource).subscribe();
    this.dialogRef.close(this.resource);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
