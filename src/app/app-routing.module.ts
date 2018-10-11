import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsListComponent },
  { path: 'resources', component: ResourcesListComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
