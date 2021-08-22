import { Component,OnInit,Inject,Optional } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { DistrictData } from '../emp';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-district-dialog',
  templateUrl: './district-dialog.component.html',
  styleUrls: ['./district-dialog.component.css']
})
export class DistrictDialogComponent implements OnInit {
  dataitem:any;
  ModelTitle:string;
  text:string;
  constructor(public dialogRef: MatDialogRef<DistrictDialogComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: DistrictData) { 
    this.dataitem = this.data;
    if(data.DistrictID > 0){
      this.ModelTitle = "Edit District";
      this.text = "Update";
    }else{
      this.ModelTitle = "Add District";
      this.text = "Save";
    }
  }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  keyPressAlphanumeric(event) {

    var input = String.fromCharCode(event.keyCode);

    if (/[\ a-zA-Z.]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  matcher = new MyErrorStateMatcher();
  DistrictFormControl = new FormControl('', [
    Validators.required,
  ]);
}
