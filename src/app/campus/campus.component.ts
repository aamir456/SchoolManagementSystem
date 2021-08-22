import { Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogRef} from '@angular/material/dialog';
import { CampusDialogComponent } from '../campus-dialog/campus-dialog.component';
import { SharedService } from '../shared.service';
import { campus } from '../emp';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {
  displayedColumns: string[] = ['CampusID','Campus','Edit','Delete'];
  data:campus[];
  pageSizes = [5, 10, 25, 100];
  name:string;
  CampusID:number;
  Campus:string;
  val:any;
  Cval:any;
  dialogConfig: MatDialogConfig;
  public dialogRef: MatDialogRef<CampusDialogComponent>;
  datasource:MatTableDataSource<campus>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,private service:SharedService) { }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<campus>(this.data); 
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    this.refreshCampusList();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CampusDialogComponent, {
      width: '450px',
      height: '300px',
      data: { name: this.Campus}
    })
    .afterClosed().subscribe(data => 
    {
      this.Cval = {Campus:data.Campus}
      console.log(data.Campus);
      this.service.addCampus(this.Cval).subscribe(res=>{alert(res.toString());
        this.refreshCampusList();
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
    const dialogRef = this.dialog.open(CampusDialogComponent, {
      width: '450px',
      height: '300px',
      data: element
    })
    .afterClosed().subscribe(data => 
    {
      this.val = {Campus:data.Campus,CampusID:data.CampusID}
      console.log(data.name);
      this.service.updateCampus(this.val).subscribe(res=>{alert(res.toString());
        this.refreshCampusList();
      });
    });
  }
  onDEL(item){
    if(confirm('Are you Sure??'))
    {
      this.service.deleteCampus(item.CampusID).subscribe(data=>{
        alert(data.toString());
        this.refreshCampusList();
      })
      console.log(item.CampusID)
    }
  }
  refreshCampusList(){
    this.service.getCampuslist().subscribe(data=>{
      this.datasource.data = data;
      return data;
    });
  }

}
