import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Store
import { StoreModule } from '@ngrx/store';
import { reducer, initialState } from './store/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { InMemoryWebApiService } from './services/in-memory-web-api.service';
import { DataService } from './services/data.service';
import { environment } from 'src/environments/environment.prod';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ResourceFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryWebApiService), // import after httpclientmodule import
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({ appState: reducer }),
    StoreDevtoolsModule.instrument({
      name: 'ngpm app devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
