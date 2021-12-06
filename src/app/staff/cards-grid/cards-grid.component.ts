import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.css']
})

export class CardsGridComponent implements OnInit {

  students$!: Observable<Users[]>;
  staff$!: Observable<Users[]>;
  admins$!: Observable<Users[]>;

  constructor(

    private router: Router,
    private usersServices: UsersService,) { 

  }

  ngOnInit() {

    this.loadStudents();

  }

  loadStudents() {

    this.students$ = this.usersServices.loadStudentsByCreatedOn();

    this.staff$ = this.usersServices.loadUsersByRole("staff");

    this.admins$ = this.usersServices.loadUsersByRole("admin");

  }

}
