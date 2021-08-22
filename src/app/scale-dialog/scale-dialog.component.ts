import { Component, OnInit,Inject,Optional } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Scale} from '../emp';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-scale-dialog',
  templateUrl: './scale-dialog.component.html',
  styleUrls: ['./scale-dialog.component.css']
})
export class ScaleDialogComponent implements OnInit {
  dataitem:any;
  ModelTitle:string;
  text:string;
  constructor(public dialogRef: MatDialogRef<ScaleDialogComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: Scale) {
    this.dataitem = this.data;
    if(data.ScaleID > 0){
      this.ModelTitle = "Edit Scale";
      this.text = "Update";
    }else{
      this.ModelTitle = "Add Scale";
      this.text = "Save";
    }
  }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
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
  matcher = new MyErrorStateMatcher();
  ScaleFormControl = new FormControl('', [
    Validators.required,
  ]);
}
