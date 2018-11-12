import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueFormComponent } from './issue-form/issue-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'issues', component: IssueListComponent }])
  ],
  declarations: [IssueListComponent, IssueFormComponent]
})
export class IssueManagementModule {}
