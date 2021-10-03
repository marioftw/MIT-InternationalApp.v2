import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {from, Observable, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import { convertSnaps } from "./db-utils";
import { Users } from "../models/users";

@Injectable({
    providedIn: "root"
})

export class UsersService {

  constructor(private db: AngularFirestore) {
    
  }

  loadStudentsByCreatedOn(): Observable<Users[]> {
    return this.db.collection(
      "users",
      ref => ref.where("role","==","student")
      .orderBy("createdOn")
      )
      .get()
      .pipe(
        map(results => convertSnaps<Users>(results)),
        // TESTING ONLY delete tap later
        tap((Users: any) => {console.log("Students were retrieved", Users)}
      )
    );    
  }

  updateStudent(studentId:string, changes: Partial<Users>):Observable<any> {
    return from(this.db.doc(`users/${studentId}`).update(changes));
  }

  deleteStudent(studentId:string) {
    return from(this.db.collection('users').doc(studentId).delete()
    );
  }

  loadUsersByRole(role: string): Observable<Users[]> {
    return this.db.collection(
      "users",
      ref => ref.where("role","==",role)
      .orderBy("createdOn")
      )
      .get()
      .pipe(
        map(results => convertSnaps<Users>(results)),
        // TESTING ONLY delete tap later
        tap((Users: any) => {console.log("Students were retrieved", Users)}
      )
    );
  }

  searchUserByUrl(userUrl: string | any): Observable<Users | null>{
    return this.db.collection("users",
    ref => ref.where("id", "==", userUrl))
    .get()
    .pipe(
      map(results => {

          const users = convertSnaps<Users>(results);

          return users.length == 1 ? users[0] : null ;}
      )
    );  
  }

}