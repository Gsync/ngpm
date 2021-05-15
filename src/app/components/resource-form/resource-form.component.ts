import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from 'src/app/models/resource';
import { DataService } from 'src/app/services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  formTitle: string;
  resource: Resource;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private dialogRef: MatDialogRef<ResourceFormComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public dialogData: Resource,
    private dataService: DataService,
    private snackBar: MatSnackBar
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
    this.dataService
      .saveResource(this.resource)
      .pipe(
        tap(() => {
          this.openSnackBar('Resource Created', 'Added');
          this.dialogRef.close(this.resource);
        })
      )
      .subscribe();
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter an email'
      : this.email.hasError('email')
        ? 'Please enter a valid email'
        : '';
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
