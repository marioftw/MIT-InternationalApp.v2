import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './shared/about/about.component';
import {LoginComponent} from './login/login.component';
import {AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {CreateUserComponent} from './admin/create-user/create-user.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TableComponent } from './shared/table/table.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';
import { CardsGridComponent } from './shared/cards-grid/cards-grid.component';
import { RegistrationFormComponent } from './student/registration-form/registration-form.component';
import { SitePoliciesComponent } from './shared/site-policies/site-policies.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  
  //{path: '**',redirectTo: '/' },

  // Shared
  { path: 'navigation', component: NavigationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  { path: 'table', component: TableComponent},
  { path: 'cards-grid', component: CardsGridComponent},
  { path: 'site-policies', component: SitePoliciesComponent},

  // Staff
  { path: 'create-user', component: CreateUserComponent},
  { path: 'dashboard', component: DashboardComponent},

  // Student
  { path: 'student-dashboard', component: StudentDashboardComponent},  
  { path: 'registration-form', component: RegistrationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
