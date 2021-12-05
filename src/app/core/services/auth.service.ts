import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class AuthService {

    isLoggedIn$ : Observable<boolean>;

    isLoggedOut$: Observable<boolean>;

    loggedInUserEmail$ : Observable<string>;

    constructor(
        // MAL: using Angular Fire Auth Service to gain access to JSON token containig user information
        private afAuth: AngularFireAuth,
        private router: Router) {

        // MAL: cheks if the object user is present in the authentication observable
        this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        this.loggedInUserEmail$ = afAuth.authState.pipe(map(user => user? user.email : null))

    }

    logout() {
        this.afAuth.signOut();
        this.router.navigateByUrl('');
    }
}
