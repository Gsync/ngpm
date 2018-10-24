import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resource } from 'src/app/models/resource';

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
    @Inject(MAT_DIALOG_DATA) public dialogData: Resource
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
  onSave() {}

  onCancel() {
    this.dialogRef.close(null);
  }
}
