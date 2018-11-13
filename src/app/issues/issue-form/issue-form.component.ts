import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Issue } from 'src/app/models/issue';
import { IssueService } from '../issue.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {
  formTitle = 'Issue Form';
  issue: Issue = {
    title: '',
    personCreated: '',
    description: ''
  };
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<IssueFormComponent>,
    private snackBar: MatSnackBar,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      console.log('current issue: ', this.issue);
      this.formTitle = 'Edit Issue';
      this.issue = this.dialogData;
    } else {
      this.formTitle = 'Add New Issue';
      this.issue = <Issue>{};
      console.log('issue: ', this.issue);
    }
  }
  onSave() {
    this.issueService
      .saveIssue(this.issue)
      .pipe(
        tap(() => {
          this.openSnackBar('Issue Created', 'Added');
          this.dialogRef.close(this.issue);
        })
      )
      .subscribe();
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
