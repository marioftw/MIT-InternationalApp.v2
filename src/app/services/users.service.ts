import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {from, Observable, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import { convertSnaps } from "./db-utils";
import { Users } from "../models/users";
import { stringify } from "querystring";
import { UserRoles } from "../models/user-roles";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})

export class UsersService {

  role$: Observable<UserRoles>

  constructor(
    // MAL: inject Angular Firestore service to be able to querry the database
    private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
      this.role$ = this.afAuth.idTokenResult
      .pipe(
        map(token => <any>token?.claims ?? {admin:false})
      )
  }

  // MAL: used in the Dashboard to display recently joined users (new students)
  loadStudentsByCreatedOn(): Observable<Users[]> {
    return this.db.collection("users", ref => ref
      .where("role","==","student")
      .orderBy("createdOn", "desc")
      .limit(10)
      )
      .get()
      .pipe(
        map(results => convertSnaps<Users>(results)),
        // MAL: DELETE TESTING ONLY delete tap later
        tap((Users: any) => {console.log("Students were retrieved", Users)}
      )
    );    
  }

  // MAL: used in the Registration Forms to save details of a new user
  createStudent(newStudent:Partial<Users>, userId?:string) {
    return this.db.collection(
      "users",
      ref => ref.where("id", "!=", newStudent .id))
      .get()
      .pipe(
        concatMap(result => {

          const users = convertSnaps<Users>(result);

          const user = {...newStudent}
          // MAL: this observable will insert data into the database
          let save$: Observable<any>;
          // MAL: ID provided by client side
          if (userId) {
            save$ = from(this.db.doc(`users/${userId}`).set(user));
          }
          // MAL: ID generated by the firebase automaticaly
          else {
            save$ = from(this.db.collection("users").add(user));
          }

          return save$
            .pipe(
                map(res => {
                    return {
                        id: userId ?? res.id,
                        ...user
                    }
                })
            );
        })
      )
  }

  // MAL: used in the Search Table component to update details of a student (only fields requested)
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
        tap((Users: any) => {console.log("User were retrieved with role " + role, Users)}
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