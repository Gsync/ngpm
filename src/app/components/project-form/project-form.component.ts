import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  project: Project;
  constructor(private dialogRef: MatDialogRef<ProjectFormComponent>) {}

  ngOnInit() {
    this.project = <Project>{};
  }

  onSave() {
    this.dialogRef.close(this.project);
  }
  onCancel() {
    this.dialogRef.close(null);
  }
}
