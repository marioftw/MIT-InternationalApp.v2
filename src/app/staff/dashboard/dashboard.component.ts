import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from '../../core/services/users.service';
import { Observable } from 'rxjs';
import { Users } from '../../core/models/users';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Recently Joined', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 2, rows: 1 },
          { title: 'Card 4', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Recently Joined', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  recentlyJoinedUser$: Observable<Users[]>;

  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Joined On'];

  constructor(
    // MAL: insert breakpoint for the size of card to change
    private breakpointObserver: BreakpointObserver,
    // MAL: Uses the Users Service for querring from database
    private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.recentlyJoinedUser$ = this.usersService.loadStudentsByCreatedOn();
  }

}
