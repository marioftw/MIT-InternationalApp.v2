import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/core/models/users';
import { UsersService } from 'src/app/core/services/users.service';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Users>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'dateOfBirth'];

  dataSource: MatTableDataSource<Users>;
  users: Users[];

  constructor(
    private usersService: UsersService
    ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit(): void {
    this.usersService.loadStudentsByCreatedOn()
    .pipe()
    .subscribe(
      users => this.users = users
    );
    this.table.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
