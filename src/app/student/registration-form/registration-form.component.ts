import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import { Important, Users } from '../../models/users';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { catchError, concatMap, last, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'registration-form',
  templateUrl: 'registration-form.component.html',
  styleUrls: ['registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {

  isLinear = false;
  isChecked = true;
  userId: string;
  dateToday = new Date();
  minDate: Date;
  maxDate: Date;
  insuranceFileUrl: string;
  passportFileUrL: string;
  visaFileUrl: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixFormGroup: FormGroup;

  constructor(
    // MAL: to create/inject a form model
    private _formBuilder: FormBuilder,
    private usersService: UsersService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 100, 0, 1);
      this.maxDate = new Date(currentYear - 17, 0, 0);
  }

  ngOnInit() {
    this.loadValidations();
    this.userId = this.afs.createId();
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
      prefered_family_name: [null, Validators.nullValidator],
      prefered_first_name: [null, Validators.nullValidator],
      title: [null, Validators.required],
      gender: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      insurance: [null, Validators.required],
      insurance_company: [null, Validators.nullValidator],
      insurance_policy_file: [null, Validators.nullValidator],
      nzqa_number: [null, Validators.compose(
        [Validators.nullValidator,  
          Validators.maxLength(10),]
      )],
      citizenship: [null, Validators.required],
      passport_file: [null, Validators.required],
      ethnic_group_1: [null, Validators.required],
      ethnic_group_2: [null, Validators.nullValidator],
      ethnic_group_3: [null, Validators.nullValidator],
      visa_file: [null, Validators.nullValidator],
    });
    this.secondFormGroup = this._formBuilder.group({
      home_address: [null, Validators.required],
      home_city: [null, Validators.required],
      home_country: [null, Validators.required],
      home_phone: [null, Validators.required],
      home_cellphone: [null, Validators.nullValidator],
      home_email: [null, Validators.compose(
        [Validators.required, 
          Validators.email,]
      )],
      work_company_name: [null, Validators.nullValidator],
      work_address: [null, Validators.nullValidator],
      work_city: [null, Validators.nullValidator],
      work_country: [null, Validators.nullValidator],
      work_phone: [null, Validators.nullValidator],
      work_cellphone: [null, Validators.nullValidator],
      work_email: [null, Validators.compose(
        [Validators.nullValidator, 
          Validators.email,]
      )],
      nz_apartment_number: [null, Validators.nullValidator],
      nz_street: [null, Validators.required],
      nz_suburb: [null, Validators.required],
      nz_city: [null, Validators.required],
      nz_postcode: [null, Validators.compose(
        [Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      nz_phone: [null, Validators.required],
      nz_cellphone: [null, Validators.nullValidator],
      nz_email: [null, Validators.compose(
        [Validators.required, 
          Validators.email,]
      )],
      emergency_contact_name: [null, Validators.required],
      emergency_home_phone: [null, Validators.required],
      emergency_work_phone: [null, Validators.nullValidator],
      emergency_cellphone: [null, Validators.nullValidator],
      emergency_relationship: [null, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      school_name: [null, Validators.nullValidator],
      school_last_year: [null, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      qualification: [null, Validators.required],
      qualification_other: [null, Validators.nullValidator],
      first_tertiary_year: [null, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      attended_tertiary: [null, Validators.required],
      first_enrolment_year: [null, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      occupation: [null, Validators.required],
      pte_name: [null, Validators.nullValidator],
      pte_last_year: [null, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      first_language: [null, Validators.required],
      programme_name: [null, Validators.required],
      programme_start_date: [null, Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      read_registration_privacy: [false, Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      read_registration_declaration: [false, Validators.required],
    });
    this.sixFormGroup = this._formBuilder.group({
      read_registration_rightToInform: [false, Validators.required],
    });
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

  uploadInsuranceFile(event) {
    const file:File = event.target.files[0];
    const filePath = `users/${this.userId}/insurance/${file.name}`;
    const task = this.storage.upload(filePath, file)
    task.snapshotChanges()
    .pipe(
      last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.insuranceFileUrl = url)
    ).subscribe();
  }

  uploadPassportFile(event) {
    const file:File = event.target.files[0];
    const filePath = `users/${this.userId}/passport/${file.name}`;
    const task = this.storage.upload(filePath, file)
    task.snapshotChanges()
    .pipe(
      last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.passportFileUrL = url)
    ).subscribe();
  }

  uploadVisaFile(event) {
    const file:File = event.target.files[0];
    const filePath = `users/${this.userId}/visa/${file.name}`;
    const task = this.storage.upload(filePath, file)
    task.snapshotChanges()
    .pipe(
      last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.visaFileUrl = url)
    ).subscribe();
  }

  onSubmitForm() {
    const newStudent = {
      ...this.firstFormGroup.value, 
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
      ...this.fifthFormGroup.value,
      ...this.sixFormGroup.value} as Users;
    const newImportant = {
      ...this.firstFormGroup.value} as Important;
    newStudent.createdOn = Timestamp.fromDate(this.dateToday);
    newStudent.userId = this.userId;
    newStudent.role = "student";
    newStudent.completed_registration_form = true;
    newImportant.passport_file = this.passportFileUrL;
    newImportant.insurance_policy_file = this.insuranceFileUrl;
    newImportant.visa_file = this.passportFileUrL;

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
