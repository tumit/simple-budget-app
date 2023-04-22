import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequirementListComponent } from './requirement-list/requirement-list.component';
import { RequirementFormComponent } from './requirement-form/requirement-form.component';

// map URL => Component

const routes: Routes = [
  { path: 'requirement-list', component: RequirementListComponent },
  { path: 'requirement-form', component: RequirementFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
