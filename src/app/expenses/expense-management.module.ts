import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'expenses', component: ExpenseListComponent }
    ])
  ],
  declarations: [ExpenseListComponent, ExpenseFormComponent]
})
export class ExpenseManagementModule {}
