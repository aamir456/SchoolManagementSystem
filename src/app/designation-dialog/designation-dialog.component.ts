import { Component, OnInit,Inject,Optional } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Designation } from '../emp';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-designation-dialog',
  templateUrl: './designation-dialog.component.html',
  styleUrls: ['./designation-dialog.component.css']
})
export class DesignationDialogComponent implements OnInit {
  dataitem:any;
  ModelTitle:string;
  text:string;
  constructor(public dialogRef: MatDialogRef<DesignationDialogComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: Designation) {
    this.dataitem = this.data;
    if(data.DesignationID > 0){
      this.ModelTitle = "Edit Designation";
      this.text = "Update";
    }else{
      this.ModelTitle = "Add Designation";
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
  DesignationFormControl = new FormControl('', [
    Validators.required,
  ]);
}
