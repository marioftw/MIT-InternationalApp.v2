import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { concatMap, last, tap } from 'rxjs/operators';
import { AcademicDetails, EmergencyConatct, Ethnicity, HomeContact, Important, NZContact, Prefered, ReadStatements, Users, WorkContact } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent{

  dateToday = new Date();
  minDate: Date;
  maxDate: Date;
  formControl: FormGroup;
  student: Users;
  userId: string;
  insuranceFileUrl: string;
  passportFileUrL: string;
  visaFileUrl: string;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private afs: AngularFirestore,
    private router: Router,
    private dialogRef: MatDialogRef<EditStudentComponent>,
    private storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) student: Users,
    @Inject(MAT_DIALOG_DATA) prefered: Prefered,
    @Inject(MAT_DIALOG_DATA) inportant: Important,
    @Inject(MAT_DIALOG_DATA) ethnicity: Ethnicity,
    @Inject(MAT_DIALOG_DATA) homeContact: HomeContact,
    @Inject(MAT_DIALOG_DATA) workContact: WorkContact,
    @Inject(MAT_DIALOG_DATA) nzContact: NZContact,
    @Inject(MAT_DIALOG_DATA) emergencyContact: EmergencyConatct,
    @Inject(MAT_DIALOG_DATA) academicDetails: AcademicDetails,
    @Inject(MAT_DIALOG_DATA) readStatements: ReadStatements) 
    {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
    this.student = student;
    this.formControl = this.fb.group({
      id: [student.id, Validators.compose([
        Validators.required, 
        Validators.minLength(9), 
        Validators.maxLength(9),]
      )],
      first_name: [student.first_name, Validators.required],
      last_name: [student.last_name, Validators.required],
      second_name: [student.second_name, Validators.nullValidator],
      prefered_family_name: [prefered.prefered_family_name, Validators.nullValidator],
      prefered_first_name: [prefered.prefered_first_name, Validators.nullValidator],
      title: [prefered.title, Validators.required],
      gender: [student.gender, Validators.required],
      dateOfBirth: [student.dateOfBirth, Validators.required],
      insurance: [inportant.insurance, Validators.required],
      insurance_company: [inportant.insurance_company, Validators.nullValidator],
      insurance_policy_file: [null, Validators.nullValidator],
      nzqa_number: [inportant.nzqa_number, Validators.compose(
        [Validators.nullValidator,  
          Validators.maxLength(10),]
      )],
      citizenship: [inportant.citinzenchip, Validators.required],
      passport_file: [null, Validators.required],
      ethnic_group_1: [ethnicity.ethnic_group_1, Validators.required],
      ethnic_group_2: [ethnicity.ethnic_group_2, Validators.nullValidator],
      ethnic_group_3: [ethnicity.ethnic_group_3, Validators.nullValidator],
      visa_file: [null, Validators.nullValidator],
      home_address: [homeContact.home_address, Validators.required],
      home_city: [homeContact.home_city, Validators.required],
      home_country: [homeContact.home_country, Validators.required],
      home_phone: [homeContact.home_phone, Validators.required],
      home_cellphone: [homeContact.home_cellphone, Validators.nullValidator],
      home_email: [homeContact.home_email, Validators.compose(
        [Validators.required, 
          Validators.email,]
      )],
      work_company_name: [workContact.work_company_name, Validators.nullValidator],
      work_address: [workContact.work_address, Validators.nullValidator],
      work_city: [workContact.work_city, Validators.nullValidator],
      work_country: [workContact.work_country, Validators.nullValidator],
      work_phone: [workContact.work_phone, Validators.nullValidator],
      work_cellphone: [workContact.work_cellphone, Validators.nullValidator],
      work_email: [workContact.work_email, Validators.compose(
        [Validators.nullValidator, 
          Validators.email,]
      )],
      nz_apartment_number: [nzContact.nz_apartment_number, Validators.nullValidator],
      nz_street: [nzContact.nz_street, Validators.required],
      nz_suburb: [nzContact.nz_suburb, Validators.required],
      nz_city: [nzContact.nz_city, Validators.required],
      nz_postcode: [nzContact.nz_postcode, Validators.compose(
        [Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      nz_phone: [nzContact.nz_phone, Validators.required],
      nz_cellphone: [nzContact.nz_cellphone, Validators.nullValidator],
      nz_email: [nzContact.nz_email, Validators.compose(
        [Validators.required, 
          Validators.email,]
      )],
      emergency_contact_name: [emergencyContact.emergency_contact_name, Validators.required],
      emergency_home_phone: [emergencyContact.emergency_home_phone, Validators.required],
      emergency_work_phone: [emergencyContact.emergency_work_phone, Validators.nullValidator],
      emergency_cellphone: [emergencyContact.emergency_cellphone, Validators.nullValidator],
      emergency_relationship: [emergencyContact.emergency_relationship, Validators.required],
      school_name: [academicDetails.school_name, Validators.nullValidator],
      school_last_year: [academicDetails.school_last_year, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      qualification: [academicDetails.qualification, Validators.required],
      qualification_other: [academicDetails.qualification_other, Validators.nullValidator],
      first_tertiary_year: [academicDetails.first_tertiary_year, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      attended_tertiary: [academicDetails.attended_tertiary, Validators.required],
      first_enrolment_year: [academicDetails.first_enrolment_year, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      occupation: [academicDetails.occupation, Validators.required],
      pte_name: [academicDetails.pte_name, Validators.nullValidator],
      pte_last_year: [academicDetails.pte_last_year, Validators.compose(
        [Validators.nullValidator, 
          Validators.minLength(4), 
          Validators.maxLength(4),]
      )],
      first_language: [academicDetails.first_language, Validators.required],
      programme_name: [academicDetails.programme_name, Validators.required],
      programme_start_date: [academicDetails.programme_start_date, Validators.required],
      read_registration_privacy: [readStatements.read_registration_privacy, Validators.required],
      read_registration_declaration: [readStatements.read_registration_declaration, Validators.required],
      read_registration_rightToInform: [readStatements.read_registration_rightToInform, Validators.required],
      })
    }
    

  close() {
    this.dialogRef.close();
  }

  save() {
    const changes = this.formControl.value;
    this.usersService.updateStudent(this.student.userId, changes)
      .subscribe(() => {
        this.dialogRef.close(changes);
      }
    );
  }

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

}
