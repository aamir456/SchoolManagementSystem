import { Component,OnInit, ViewChild} from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogRef} from '@angular/material/dialog';
import { ScaleDialogComponent } from '../scale-dialog/scale-dialog.component';
import { SharedService } from '../shared.service';
import { Scale } from '../emp';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.css']
})
export class ScaleComponent implements OnInit {
  displayedColumns: string[] = ['ScaleID','Scale','Edit','Delete'];
  data:Scale[];
  pageSizes = [5, 10, 25, 100];
  ScaleID:number;
  Scale:string;
  save:any;
  update:any;
  dialogConfig: MatDialogConfig;
  public dialogRef: MatDialogRef<ScaleDialogComponent>;
  datasource:MatTableDataSource<Scale>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,private service:SharedService) { }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Scale>(this.data); 
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    this.refreshScaleList();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ScaleDialogComponent, {
      width: '450px',
      height: '300px',
      data: { name: this.Scale}
    })
    .afterClosed().subscribe(data => 
      {
        this.save = {Scale:data.Scale}
        console.log(data.Scale);
        this.service.addScale(this.save).subscribe(res=>{alert(res.toString());
          this.refreshScaleList();
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
    const dialogRef = this.dialog.open(ScaleDialogComponent, {
      width: '450px',
      height: '300px',
      data: element
    })
    .afterClosed().subscribe(data => 
    {
      this.update = {Scale:data.Scale,ScaleID:data.ScaleID}
      console.log(data.Scale);
      this.service.updateScale(this.update).subscribe(res=>{alert(res.toString());
        this.refreshScaleList();
      });
    });
  }
  onDEL(item){
    if(confirm('Are you Sure??'))
    {
      this.service.deleteScale(item.ScaleID).subscribe(data=>{
        alert(data.toString());
        this.refreshScaleList();
      })
      console.log(item.ScaleID)
    }
  }
  refreshScaleList(){
    this.service.getScalelist().subscribe(data=>{
      this.datasource.data = data;
      return data;
    });
  }

}
