import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadedStudents$: Observable<Users[]>;
  dataSource: MatTableDataSource<any>;
  //users: Users[];
  displayedColumns = ['id', 'first_name', 'second_name','last_name', 'prefered_name','home_email', 'nz_phone', 'dateOfBirth', 'actions'];

  @Input()
  users: Users[];
  
  @Output()
  studentEdited = new EventEmitter();

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog
    ) {
    // MAL: Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<Users>(this.users);
  }

  ngOnInit() {
    this.loadContent();
    // MAL: reference video: https://www.youtube.com/watch?v=7wilnsiotqM
  //   this.usersService.loadStudentsByCreatedOn()
  //   .subscribe(
  //     list => {
  //       let array = list.map(item => {
  //         return {

  //         };
  //       });
  //       this.dataSource = new MatTableDataSource(array);
  //     }
  //   )
  }

  loadContent() {
    this.loadedStudents$ = this.usersService.loadStudentsByCreatedOn();
    this.usersService.loadStudentsByCreatedOn()
    .pipe()
    .subscribe(
      users => this.users = users
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editStudent(student:Users) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "400px";

    dialogConfig.data = student;

    this.dialog.open(EditStudentComponent, dialogConfig)
        .afterClosed()
        .subscribe(val => {
            if (val) {
                this.studentEdited.emit();
            }
        });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  connect(): Observable<Users[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.users), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.users ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: Users[]): Users[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Users[]): Users[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'first_name': return compare(+a.first_name, +b.first_name, isAsc);
        case 'last_name': return compare(+a.last_name, +b.last_name, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'dateOfBirth': return compare(+a.dateOfBirth, +b.dateOfBirth, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
