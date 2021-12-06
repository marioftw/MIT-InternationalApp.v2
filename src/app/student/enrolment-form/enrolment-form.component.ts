import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-enrolment-form',
  templateUrl: './enrolment-form.component.html',
  styleUrls: ['./enrolment-form.component.css']
})
export class EnrolmentFormComponent implements OnInit {

  userId: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadValidations();
  }

  loadValidations() {
    this.firstFormGroup = this._formBuilder.group({
      id: [null, Validators.compose(
        [Validators.required, 
          Validators.minLength(9), 
          Validators.maxLength(9),]
      )],
      last_name: [null, Validators.required],
      first_name: [null, Validators.required],
      second_name: [null, Validators.nullValidator],
    });
    this.secondFormGroup = this._formBuilder.group({
      programme_name: [null, Validators.required],
      programme_code: [null, Validators.required],
      programme_expected_completion: [null, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      course_01_code: [null, Validators.required],
      course_01_occurance: [null, Validators.nullValidator],
      course_01_title: [null, Validators.required],
      course_02_code: [null, Validators.nullValidator],
      course_02_occurance: [null, Validators.nullValidator],
      course_02_title: [null, Validators.nullValidator],
      course_03_code: [null, Validators.nullValidator],
      course_03_occurance: [null, Validators.nullValidator],
      course_03_title: [null, Validators.nullValidator],
      course_04_code: [null, Validators.nullValidator],
      course_04_occurance: [null, Validators.nullValidator],
      course_04_title: [null, Validators.nullValidator],
      course_05_code: [null, Validators.nullValidator],
      course_05_occurance: [null, Validators.nullValidator],
      course_05_title: [null, Validators.nullValidator],
      course_06_code: [null, Validators.nullValidator],
      course_06_occurance: [null, Validators.nullValidator],
      course_06_title: [null, Validators.nullValidator],
      course_07_code: [null, Validators.nullValidator],
      course_07_occurance: [null, Validators.nullValidator],
      course_07_title: [null, Validators.nullValidator],
      course_08_code: [null, Validators.nullValidator],
      course_08_occurance: [null, Validators.nullValidator],
      course_08_title: [null, Validators.nullValidator],
      course_09_code: [null, Validators.nullValidator],
      course_09_occurance: [null, Validators.nullValidator],
      course_09_title: [null, Validators.nullValidator],
      course_10_code: [null, Validators.nullValidator],
      course_10_occurance: [null, Validators.nullValidator],
      course_10_title: [null, Validators.nullValidator],
    });
    this.fourthFormGroup = this._formBuilder.group({
      read_enrolment_transfers: [false, Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      read_enrolment_privacy: [false, Validators.required],
    });
    this.sixFormGroup = this._formBuilder.group({
      read_enrolment_declaration: [false, Validators.required],
    });
  }

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

  onSubmitForm() {
    const newStudent = {
      ...this.firstFormGroup.value, 
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
      ...this.fifthFormGroup.value} as Users;
    newStudent.completed_enrolment_form = true;

    this.usersService.createStudent(newStudent, this.userId)
    .pipe(
      tap(student => {
        alert("Form submited successfully!");
        this.router.navigateByUrl("/student-dashboard");
      }),
      catchError(err => {
        alert("Could not submit form at this time. Check your internet connection or try later.");
        return throwError(err);
      })
    )
    .subscribe();
  }

}
