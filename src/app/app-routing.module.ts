import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsListComponent },
  { path: 'resources', component: ResourcesListComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'projects/0/edit', component: ProjectFormComponent },
  { path: 'resources/0/edit', component: ResourceFormComponent },
  { path: 'projects/:id/edit', component: ProjectFormComponent },
  { path: 'resources/:id/edit', component: ResourceFormComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
