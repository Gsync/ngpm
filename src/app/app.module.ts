import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

// Store
import { StoreModule } from "@ngrx/store";
import { reducer, initialState } from "./store/reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material/material.module";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ProjectsListComponent } from "./components/projects-list/projects-list.component";
import { ActivitiesListComponent } from "./components/activities-list/activities-list.component";
import { ResourcesListComponent } from "./components/resources-list/resources-list.component";
import { ResourceDetailsComponent } from "./components/resource-details/resource-details.component";
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";
import { ActivityDetailsComponent } from "./components/activity-details/activity-details.component";
import { ActivityFormComponent } from "./components/activity-form/activity-form.component";
import { ProjectFormComponent } from "./components/project-form/project-form.component";
import { ResourceFormComponent } from "./components/resource-form/resource-form.component";
import { InMemoryWebApiService } from "./services/in-memory-web-api.service";
import { DataService } from "./services/data.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IssueManagementModule } from "./issues/issue-management.module";
import { ExpenseManagementModule } from "./expenses/expense-management.module";
import { ConvertSecondsPipe } from "./shared/pipes/convert-seconds.pipe";
import { FirebaseDataService } from "./services/firebase-data.service";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    ProjectsListComponent,
    ActivitiesListComponent,
    ResourcesListComponent,
    ResourceDetailsComponent,
    ProjectDetailsComponent,
    ActivityDetailsComponent,
    ActivityFormComponent,
    ProjectFormComponent,
    ResourceFormComponent,
    ConvertSecondsPipe,
  ],
  entryComponents: [ActivityFormComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryWebApiService), // import after httpclientmodule import
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(
      { appState: reducer },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      name: "ngpm app devtools",
      maxAge: 25,
      logOnly: true, // environment.production
    }),
    IssueManagementModule,
    ExpenseManagementModule,
  ],
  providers: [DataService, FirebaseDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
