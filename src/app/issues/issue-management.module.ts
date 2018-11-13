import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { IssueService } from './issue.service';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'issues', component: IssueListComponent }]),
    MaterialModule,
    FormsModule
  ],
  entryComponents: [IssueFormComponent],
  declarations: [IssueListComponent, IssueFormComponent],
  providers: [IssueService]
})
export class IssueManagementModule {}
