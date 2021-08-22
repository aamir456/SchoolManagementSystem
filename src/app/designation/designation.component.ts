import { Component,OnInit, ViewChild} from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogRef} from '@angular/material/dialog';
import { DesignationDialogComponent } from '../designation-dialog/designation-dialog.component';
import { SharedService } from '../shared.service';
import { Designation } from '../emp';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  displayedColumns: string[] = ['DesignationID','Designation','Edit','Delete'];
  data:Designation[];
  pageSizes = [5, 10, 25, 100];
  //name:string;
  DesignationID:number;
  Designation:string;
  save:any;
  update:any;
  dialogConfig: MatDialogConfig;
  public dialogRef: MatDialogRef<DesignationDialogComponent>;
  datasource:MatTableDataSource<Designation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,private service:SharedService) { }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Designation>(this.data); 
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    this.refreshDesignationList();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DesignationDialogComponent, {
      width: '450px',
      height: '300px',
      data: { name: this.Designation}
    })
    .afterClosed().subscribe(data => 
      {
        this.save = {Designation:data.Designation}
        console.log(data.Designation);
        this.service.addDesignation(this.save).subscribe(res=>{alert(res.toString());
          this.refreshDesignationList();
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
    const dialogRef = this.dialog.open(DesignationDialogComponent, {
      width: '450px',
      height: '300px',
      data: element
    })
    .afterClosed().subscribe(data => 
    {
      this.update = {Designation:data.Designation,DesignationID:data.DesignationID}
      console.log(data.Designation);
      this.service.updateDesignation(this.update).subscribe(res=>{alert(res.toString());
        this.refreshDesignationList();
      });
    });
  }
  onDEL(item){
    if(confirm('Are you Sure??'))
    {
      this.service.deleteDesignation(item.DesignationID).subscribe(data=>{
        alert(data.toString());
        this.refreshDesignationList();
      })
      console.log(item.DesignationID)
    }
  }
  refreshDesignationList(){
    this.service.getDesignationlist().subscribe(data=>{
      this.datasource.data = data;
      return data;
    });
  }
}
