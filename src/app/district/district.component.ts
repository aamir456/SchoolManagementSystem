import { Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialogRef} from '@angular/material/dialog';
import {DistrictDialogComponent} from '../district-dialog/district-dialog.component';
import { SharedService } from '../shared.service';
import {DomicileDistrict} from '../emp';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  displayedColumns: string[] = ['DistrictID','DistrictName','Edit','Delete'];
  data:DomicileDistrict[];
  pageSizes = [5, 10, 25, 100];
  pageEvent: PageEvent;
  name:string;
  val:any;
  id:number;
  Departmentdata:any;
  DistrictID:number;
  DistrictName:string;
  DistrictDetails:DomicileDistrict;
  dialogConfig: MatDialogConfig;
  public dialogRef: MatDialogRef<DistrictDialogComponent>;
  datasource:MatTableDataSource<DomicileDistrict>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,private service:SharedService) { }
  dept:DomicileDistrict={
    DistrictID:0,
    DistrictName:''
  };
  ngOnInit(): void {
    this.datasource = new MatTableDataSource<DomicileDistrict>(this.data); 
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    this.refreshDepList();
  }
  ngAfterViewInit(): void {
    this.paginator.pageIndex = 2;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(): void {
    var val;
    this.service.openDistrictDialog()
    .subscribe(data =>{
    
       if(this.onNoClick)
        { 
         this.onNoClick;
        } 
        for (val in data){
          console.log(data[val]);
          this.service.addDistrict(data[val]).subscribe(res=>{alert(res.toString());
          this.refreshDepList();
        }); 
      }
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
    const dialogRef = this.dialog.open(DistrictDialogComponent, {
      width: '450px',
      height: '300px',
      data: element
    })
    .afterClosed().subscribe(item => 
    {
      this.val = {DistrictName:item.name,DistrictID:item.DistrictID}
      console.log(item.name);
      this.service.updateDistrict(this.val).subscribe(res=>{alert(res.toString());
        this.refreshDepList();
      });
    });
  }
  onDEL(item){
    if(confirm('Are you Sure??'))
    {
      this.service.deleteDistrict(item.DistrictID).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }
  refreshDepList(){
    this.service.getDistrictlist().subscribe(data=>{
      this.datasource.data = data;
      return data;
    });
  }

}
