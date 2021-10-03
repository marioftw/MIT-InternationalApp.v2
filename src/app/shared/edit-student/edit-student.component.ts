import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/models/users';
import { UsersService } from 'src/app/core/services/users.service';

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

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private afs: AngularFirestore,
    private router: Router,
    private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) student: Users,) 
    {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
    this.student = student;
    this.formControl = this.fb.group({
      first_name: [student.first_name, Validators.required],
      last_name: [student.last_name, Validators.required],
      email: [student.email, Validators.compose([
        Validators.required, 
        Validators.email,]
      )],
      id: [student.id, Validators.compose([
        Validators.required, 
        Validators.minLength(9), 
        Validators.maxLength(9),]
      )],
      dateOfBirth: [student.dateOfBirth, Validators.required],
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

}
