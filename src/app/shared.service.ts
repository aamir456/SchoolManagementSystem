import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DistrictDialogComponent } from './district-dialog/district-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  DepartmentName: string;
  DistrictName: string;
  readonly APIUrl = "http://localhost:62711/api";
  constructor(private http: HttpClient, private router: Router,public dialog: MatDialog) { }
    public getDeptlist() {return this.http.get<any>(this.APIUrl+"/Department");}
    addDepartment(val: any){
      const obj = {DepartmentName:val}
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.post(this.APIUrl + '/Department',obj,httpOptions);
    }
    
    updateDepartment(val: any){
      return this.http.put(this.APIUrl + '/Department', val); 
    }
  
    deleteDepartment(val: any){return this.http.delete(this.APIUrl + '/Department/' + val); }
    public getDistrictlist() {return this.http.get<any>(this.APIUrl+"/Districts");};
    public getGenderList() {return this.http.get<any>(this.APIUrl+"/Gender");};
    public getMartialStatusList() {return this.http.get<any>(this.APIUrl+"/MartialStatus");};
    openDistrictDialog(): Observable<any> {
      const dialogRef = this.dialog.open(DistrictDialogComponent, {
        width: '450px',
        height: '300px',
        data: { name: this.DistrictName}
      });
      return dialogRef.afterClosed();
    }
    addDistrict(val: any){
      const obj = {DistrictName:val}
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.post(this.APIUrl + '/Districts',obj,httpOptions); 
    }
    
    updateDistrict(val: any){
      return this.http.put(this.APIUrl + '/Districts', val); }
  
    deleteDistrict(val: any){return this.http.delete(this.APIUrl + '/Districts/' + val); }
    addCampus(val: any){
      return this.http.post(this.APIUrl + '/Campus',val);
    }
    updateCampus(val: any){return this.http.put(this.APIUrl + '/Campus', val);}
    deleteCampus(val: any){return this.http.delete(this.APIUrl + '/Campus/' + val);}
    public getCampuslist() {return this.http.get<any>(this.APIUrl+"/Campus");};
    addDesignation(val: any){
      return this.http.post(this.APIUrl + '/Designation',val);
    }
    updateDesignation(val: any){return this.http.put(this.APIUrl + '/Designation', val);}
    deleteDesignation(val: any){return this.http.delete(this.APIUrl + '/Designation/' + val);}
    public getDesignationlist() {return this.http.get<any>(this.APIUrl+"/Designation");};
    addScale(val: any){
      return this.http.post(this.APIUrl + '/Scale',val);
    }
    updateScale(val: any){return this.http.put(this.APIUrl + '/Scale', val);}
    deleteScale(val: any){return this.http.delete(this.APIUrl + '/Scale/' + val);}
    public getScalelist() {return this.http.get<any>(this.APIUrl+"/Scale");};
    addTeacher(val: any){
      return this.http.post(this.APIUrl + '/Teacher',val);
    }
    updateTeacher(val: any){return this.http.put(this.APIUrl + '/Teacher', val);}
    deleteTeacher(val: any){return this.http.delete(this.APIUrl + '/Teacher/' + val);}
    public getTeacherlist() {return this.http.get<any>(this.APIUrl+"/Teacher");}
}

