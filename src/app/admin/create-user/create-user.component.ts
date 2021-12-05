import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Timestamp = firebase.firestore.Timestamp;
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from 'src/app/core/models/users';
import { UsersService } from 'src/app/core/services/users.service';
import firebase from 'firebase';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userId!: string;
  dateToday = new Date();
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private afs: AngularFirestore,
    private router: Router,) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
    }

  ngOnInit(): void {
    this.userId = this.afs.createId();
  }

  // Reference: https://stackoverflow.com/questions/37168571/angular-2-multiple-validators
  formControl = this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, Validators.compose(
      [Validators.required, 
        Validators.email,]
    )],
    id: [null, Validators.compose(
      [Validators.required, 
        Validators.minLength(9), 
        Validators.maxLength(9),]
    )],
    dateOfBirth: [null, Validators.required],
  });

  // Reference: https://www.freakyjolly.com/angular-allow-only-numbers-or-alphanumeric-in-input-restrict-other-characters-using-keypress-event/
  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  keyPressText(event: { keyCode: number; preventDefault: () => void; }) {
    var inp = String.fromCharCode(event.keyCode);
    // Only Text
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  onSubmit () {
    const newStudent = {...this.formControl.value} as Users;
    newStudent.dateOfBirth = Timestamp.fromDate(this.formControl.value.dateOfBirth);
    newStudent.createdOn = Timestamp.fromDate(this.dateToday);
    newStudent.userId = this.userId;
    newStudent.role = "student";
    
    this.usersService.createStudent(newStudent, this.userId)
      .pipe(
        tap(student => {
          console.log("Created new student: ", student);
          alert("Created new student!");
          this.router.navigateByUrl("/home");
        }),
        catchError(err => {
          console.log(err);
          alert("Could not create a new student.");
          return throwError(err);
        })
      )
      .subscribe();
  }

}
