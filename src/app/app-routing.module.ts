import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'users',component:UsersComponent},
  { path: 'search/:name', component: UsersComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
