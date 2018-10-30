import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Activity } from 'src/app/models/activity';
import { tap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  formTitle = 'Activity Form';
  currentProjectId: string;
  activity: Activity = {
    title: '',
    personCreated: '',
    description: ''
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ActivityFormComponent>,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentProjectId = this.dialogData;
    if (this.activity._id) {
      this.formTitle = 'Edit Activity';
    } else {
      this.formTitle = 'Add New Activity';
    }
  }

  onSave() {
    this.dataService
      .saveActivity(this.currentProjectId, this.activity)
      .pipe(
        tap(() => {
          this.openSnackBar('Activity Created', 'Added');
          this.dialogRef.close(null);
        })
      )
      .subscribe();

    // TODO: Refresh page to show updated activities
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
