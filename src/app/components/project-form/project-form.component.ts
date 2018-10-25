import { Component, OnInit, Inject } from '@angular/core';
import { Project } from '../../models/project';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/services/data.service';

export interface Priority {
  value: number;
  title: string;
}
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  project: Project;
  formTitle = 'Project Form';
  priorities: Priority[] = [
    { value: 1, title: 'Low' },
    { value: 2, title: 'Medium' },
    { value: 3, title: 'High' }
  ];
  constructor(
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Project,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      this.project = this.dialogData;
      this.formTitle = 'Edit Project';
    } else {
      this.project = <Project>{};
      this.formTitle = 'Add New Project';
    }
  }

  onSave() {
    this.dataService.saveProject(this.project).subscribe();
    this.dialogRef.close(this.project);
  }
  onCancel() {
    this.dialogRef.close(null);
  }
}
