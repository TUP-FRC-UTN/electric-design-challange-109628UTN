import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { Routes } from '@angular/router';
import { BudgetViewComponent } from './budget-view/budget-view.component';

export const routes: Routes = [
  // { path: '', component: BudgetListComponent },
  { path: 'list', component: BudgetListComponent },
  { path: 'new', component: BudgetFormComponent },
  { path: 'details/:id', component: BudgetViewComponent },
  // {path: '**', redirectTo: 'list', pathMatch: 'full'}
];
