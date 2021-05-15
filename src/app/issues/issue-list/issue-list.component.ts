import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { IssueService } from "../issue.service";
import { Issue } from "../../models/issue";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IssueFormComponent } from "../issue-form/issue-form.component";
import { Resource } from "src/app/models/resource";

@Component({
  selector: "app-issue-list",
  templateUrl: "./issue-list.component.html",
  styleUrls: ["./issue-list.component.scss"],
})
export class IssueListComponent implements OnInit, OnDestroy {
  issues: Issue[];
  issue: Issue;
  issueSubscription;
  displayedColumns: string[] = [
    "title",
    "dateCreated",
    "priority",
    "status",
    "actions",
  ];
  datasource: MatTableDataSource<Issue>;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  constructor(private issueService: IssueService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getIssues();
  }
  ngOnDestroy() {
    this.issueSubscription.unsubscribe();
  }
  getIssues() {
    this.issueSubscription = this.issueService.getIssues().subscribe((data) => {
      this.datasource = new MatTableDataSource<Issue>(data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }
  createNewDialog(issue?: Issue): void {
    const dialogRef = this.dialog.open(IssueFormComponent, {
      width: "450px",
      data: issue,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.issue = data;
        console.log("this dialog was closed", this.issue);
        this.getIssues();
      }
    });
  }
  deleteIssue(issue: Issue) {
    if (confirm(`Really delete this issue?`)) {
      this.issueService.deleteIssue(issue._id).subscribe(() => {
        // Refresh DataTable to remove activity row from datasource.
        // this.deleteRowDataTable(issue._id, this.paginator, this.datasource);
        // TODO: doesnt refresh the table to update the deleted record
      });
    }
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  // Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable(itemId, paginator, dataSource) {
    const dsData = dataSource.data;
    const itemIndex = dsData.findIndex((obj) => obj["_id"] === itemId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }
}
