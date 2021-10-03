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

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router) {

        this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    }

    logout() {
        this.afAuth.signOut();
        this.router.navigateByUrl('');
    }
}
