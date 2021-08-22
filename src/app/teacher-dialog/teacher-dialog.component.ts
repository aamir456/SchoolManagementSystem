import { Component,OnInit,Inject,Optional } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { TeachersData } from '../emp';
import { DomicileDistrict } from '../emp';
import { Gender } from '../emp';
import { MartialStatus } from '../emp';
import { Designation } from '../emp';
import { Scale } from '../emp';
import { campus } from '../emp';
import { SharedService } from '../shared.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.css']
})
export class TeacherDialogComponent implements OnInit {
  Domicile:DomicileDistrict[];
  DROPDOWN_LIST: DomicileDistrict[];
  Gender_DROPDOWN:Gender[];
  Status_DROPDOWN:MartialStatus[];
  Designation_DROPDOWN:Designation[];
  Scale_DROPDOWN:Scale[];
  campus_DROPDOWN:campus[];
  districtdata:any;
  dataitem:any;
  text:string;
  val:number;
  ModelTitle:string;
  dialogConfig: MatDialogConfig;
  planModel: any = {DOB:Date};
  constructor(private service:SharedService,public dialogRef: MatDialogRef<TeacherDialogComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: TeachersData) {
    this.dataitem = this.data;
    if(data.TeacherID > 0){
      this.ModelTitle = "Edit Teacher";
      this.text = "Update";
    }else{
      this.ModelTitle = "Add Teacher";
      this.text = "Save";
    }
  }
  ngOnInit(): void {
    this.service.getDistrictlist().subscribe(data=>{
      this.DROPDOWN_LIST = data;
    });
    this.service.getGenderList().subscribe(data=>{
      this.Gender_DROPDOWN = data;
    })
    this.service.getMartialStatusList().subscribe(data=>{
      this.Status_DROPDOWN = data;
    })
    this.service.getDesignationlist().subscribe(data=>{
      this.Designation_DROPDOWN = data;
    })
    this.service.getScalelist().subscribe(data=>{
      this.Scale_DROPDOWN = data;
    })
    this.service.getCampuslist().subscribe(data=>{
      this.campus_DROPDOWN = data;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  dateChanged(evt){
    let selectedDate = new Date;
    var a = selectedDate.setDate(selectedDate.getDate() + 1);
    console.log("by default:", selectedDate);
    console.log("by UTCString:", selectedDate.toUTCString());
    console.log("STRINGIFIED TIME:", JSON.stringify(selectedDate));
    console.log("by LocaleTimeString:", selectedDate.toLocaleTimeString());
  }
  keyPressAlphanumeric(event) {
    var input = String.fromCharCode(event.keyCode);
    if (/^[\ a-zA-Z.]*$/.test(input)) {
      return true;
    } 
    else {
      event.preventDefault();
      return false;
    }
  }
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  keyPressAdress(event) {

    var input = String.fromCharCode(event.keyCode);

    if (/[\ a-zA-Z0-9#,-/]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressEmail(event) {
    var input = String.fromCharCode(event.keyCode);
    if (/[\ a-zA-Z0-9#,-/@]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  fnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  cnicFormControl = new FormControl('', [
    Validators.required,
  ]);  PostalAddressFormControl = new FormControl('', [
    Validators.required,
  ]);  PermanentAddressFormControl = new FormControl('', [
    Validators.required,
  ]);  ContactNumberFormControl = new FormControl('', [
    Validators.required,
  ]);  EmailAddressFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);  ReligionFormControl = new FormControl('', [
    Validators.required,
  ]);  DistrictFormControl = new FormControl('', [
    Validators.required,
  ]);  GenderFormControl = new FormControl('', [
    Validators.required,
  ]);  MartialStatusFormControl = new FormControl('', [
    Validators.required,
  ]); DesignationFormControl = new FormControl('', [
    Validators.required,
  ]);  CampusFormControl = new FormControl('', [
    Validators.required,
  ]);  ScaleFormControl = new FormControl('', [
    Validators.required,
  ]);  NationalityFormControl = new FormControl('', [
    Validators.required,
  ]);  DOBFormControl = new FormControl('', [
    Validators.required,
  ]);AppointmentDateFormControl = new FormControl('', [
    Validators.required,
  ]);ConfirmationDateFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();
  // ^$|^[a-zA-Z0-9]+$
  //[a-zA-Z.]
  //ng-pattern="/^[a-zA-Z.]*$/"
  //"/^[\w -]*$/"
  
}
