import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { DistrictComponent } from './district/district.component';
import { CampusComponent } from './campus/campus.component';
import { DesignationComponent } from './designation/designation.component';
import { ScaleComponent } from './scale/scale.component';
const routes: Routes = [
  {path:'teacher',component:EmployeeManagementComponent},
  {path:'district',component:DistrictComponent},
  {path:'campus',component:CampusComponent},
  {path:'designation',component:DesignationComponent},
  {path:'scale',component:ScaleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
