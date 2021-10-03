import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from 'src/app/core/models/users';
import { UsersService } from 'src/app/core/services/users.service';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {

  @Input()
  users: Users[] | any;

  @Output()
  studentEdited = new EventEmitter();

  @Output()
  studentDeleted = new EventEmitter();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private dialog: MatDialog) {

  }

  ngOnInit() {

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

  deleteStudent (student:Users) {

    this.usersService.deleteStudent(student.userId)
    .pipe(
        tap(() => {
          console.log("Deleted user", student);
            this.studentDeleted.emit(student);
        }),
        catchError(err => {
            console.log(err);
            alert("Could not delete user.");
            return throwError(err);
        })
    )
    .subscribe();
  }

}
