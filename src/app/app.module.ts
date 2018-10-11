import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ActivitiesListComponent } from './components/activities-list/activities-list.component';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, SidenavComponent, ProjectsListComponent, ActivitiesListComponent, ResourcesListComponent, ResourceDetailsComponent, ProjectDetailsComponent, ActivityDetailsComponent, ActivityFormComponent, ProjectFormComponent, ResourceFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
