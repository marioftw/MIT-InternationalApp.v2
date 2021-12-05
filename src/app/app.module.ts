import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

// Material
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Components -- Shared
import { HomeComponent } from './home/home.component';
import { SitePoliciesComponent } from './shared/site-policies/site-policies.component';
import { RegistrationFormComponent } from './student/registration-form/registration-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TableComponent } from './shared/table/table.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';
import { CardsComponent } from './shared/cards/cards.component';
import { EditStudentComponent } from './shared/edit-student/edit-student.component';
import { CardsGridComponent } from './shared/cards-grid/cards-grid.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './shared/about/about.component';

// Components -- Admin
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,

    LoginComponent,
    // Shared
    HomeComponent,
    RegistrationFormComponent,
    NavigationComponent,
    TableComponent,
    DashboardComponent,
    CardsComponent,
    EditStudentComponent,
    CardsGridComponent,
    SitePoliciesComponent,
    // Admin
    CreateUserComponent,
    StudentDashboardComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    CdkTableModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatRadioModule,
    MatStepperModule,
    MatCheckboxModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
  { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
  { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
  { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
