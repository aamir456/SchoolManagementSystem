import { Component, OnInit,Inject,Optional } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { campus } from '../emp';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-campus-dialog',
  templateUrl: './campus-dialog.component.html',
  styleUrls: ['./campus-dialog.component.css']
})
export class CampusDialogComponent implements OnInit {
  dataitem:any;
  ModelTitle:string;
  text:string;
  constructor(public dialogRef: MatDialogRef<CampusDialogComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: campus) { 
    this.dataitem = this.data;
    if(data.CampusID > 0){
      this.ModelTitle = "Edit Campus";
      this.text = "Update";
    }else{
      this.ModelTitle = "Add Campus";
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

    if (/[\ a-zA-Z0-9,-/]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  matcher = new MyErrorStateMatcher();
  CampusFormControl = new FormControl('', [
    Validators.required,
  ]);
}
