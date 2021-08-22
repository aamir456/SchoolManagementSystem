import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { DistrictComponent } from './district/district.component';
import { DistrictDialogComponent } from './district-dialog/district-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DesignationComponent } from './designation/designation.component';
import { ScaleComponent } from './scale/scale.component';
import { CampusComponent } from './campus/campus.component';
import { DesignationDialogComponent } from './designation-dialog/designation-dialog.component';
import { CampusDialogComponent } from './campus-dialog/campus-dialog.component';
import { ScaleDialogComponent } from './scale-dialog/scale-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeManagementComponent,
    TeacherDialogComponent,
    DistrictComponent,
    DistrictDialogComponent,
    DesignationComponent,
    ScaleComponent,
    CampusComponent,
    DesignationDialogComponent,
    CampusDialogComponent,
    ScaleDialogComponent
  ],
  entryComponents: [
    TeacherDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
