import { Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { TeacherDialogComponent } from '../teacher-dialog/teacher-dialog.component';
import { SharedService } from '../shared.service';
import { TeacherData } from '../emp';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  displayedColumns: string[] = ['TeacherID','Name','FatherName','CNIC','Designation',
  'Scale','AppointmentDate','ConfirmationDate','Status','EmailAddress','ContactNumber',
  'Edit','Delete'];
  data:TeacherData[];
  pageSizes = [5, 10, 25, 100];
  save:any;
  update:any;
  TeacherID:number;
  Name:string;
  FatherName: string;
  CNIC:string;
  PostalAddress:string;
  PermanentAddress:string;
  ContactNumber:string;
  EmailAddress:string;
  Religion:string;
  DistrictID:number;
  GenderID:number;
  StatusID:number;
  DesignationID:number;
  CampusID:number;
  ScaleID:number;
  Nationality:string
  DOB:Date;
  AppointmentDate:Date;
  ConfirmationDate:Date;
  public dialogRef: MatDialogRef<TeacherDialogComponent>;
  datasource:MatTableDataSource<TeacherData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,private service:SharedService) { }
  ngOnInit(): void {
    this.datasource = new MatTableDataSource<TeacherData>(this.data); 
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    this.refreshTeacherList();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TeacherDialogComponent, {
      width: '850px',
      height: '500px',
      data: { Name: this.Name,FatherName:this.FatherName,CNIC:this.CNIC,
      PostalAddress:this.PostalAddress,PermanentAddress:this.PermanentAddress,
      ContactNumber:this.ContactNumber,EmailAddress:this.EmailAddress,
      Religion:this.Religion,DistrictID:this.DistrictID,GenderID:this.GenderID,
      StatusID:this.StatusID,DesignationID:this.DesignationID,CampusID:this.CampusID,
      ScaleID:this.ScaleID,Nationality:this.Nationality,DOB:this.DOB,
      AppointmentDate:this.AppointmentDate,ConfirmationDate:this.ConfirmationDate}
    })
    .afterClosed().subscribe(data => 
      {
        this.save = {Name: data.Name,FatherName:data.FatherName,CNIC:data.CNIC,
          PostalAddress:data.PostalAddress,PermanentAddress:data.PermanentAddress,
          ContactNumber:data.ContactNumber,EmailAddress:data.EmailAddress,
          Religion:data.Religion,DistrictID:data.DistrictID,GenderID:data.GenderID,
          StatusID:data.StatusID,DesignationID:data.DesignationID,CampusID:data.CampusID,
          ScaleID:data.ScaleID,Nationality:data.Nationality,DOB:data.DOB,
          AppointmentDate:data.AppointmentDate,ConfirmationDate:data.ConfirmationDate
        }
        console.log(this.save);
        this.service.addTeacher(this.save).subscribe(res=>{alert(res.toString());
          this.refreshTeacherList();
        });
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  UpdateDialog(element):void{
    const dialogRef = this.dialog.open(TeacherDialogComponent, {
      width: '850px',
      height: '500px',
      data: element
    })
    .afterClosed().subscribe(data => 
    {
      this.update = {TeacherID:data.TeacherID,Name: data.Name,FatherName:data.FatherName,CNIC:data.CNIC,
        PostalAddress:data.PostalAddress,PermanentAddress:data.PermanentAddress,
        ContactNumber:data.ContactNumber,EmailAddress:data.EmailAddress,
        Religion:data.Religion,DistrictID:data.DistrictID,GenderID:data.GenderID,
        StatusID:data.StatusID,DesignationID:data.DesignationID,CampusID:data.CampusID,
        ScaleID:data.ScaleID,Nationality:data.Nationality,DOB:data.DOB,
        AppointmentDate:data.AppointmentDate,ConfirmationDate:data.ConfirmationDate
      }
      console.log(this.update);
      this.service.updateTeacher(this.update).subscribe(res=>{alert(res.toString());
        this.refreshTeacherList();
      });
    });
  }
  onDEL(item){
    if(confirm('Are you Sure??'))
    {
      this.service.deleteTeacher(item.TeacherID).subscribe(data=>{
        alert(data.toString());
        this.refreshTeacherList();
      })
    }
  }
  refreshTeacherList(){
    this.service.getTeacherlist().subscribe(data=>{
      this.datasource.data = data;
      return data;
    });
  }
}
