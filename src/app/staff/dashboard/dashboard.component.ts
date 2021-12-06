import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { Users } from '../../models/users';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  recentlyJoinedUser$: Observable<Users[]>;

  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Joined On'];

  constructor(
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
