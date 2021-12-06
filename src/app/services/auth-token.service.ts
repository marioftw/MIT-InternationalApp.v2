import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})

// This service access the firebase authentication Json web token as a string
export class AuthTokenService {

    authJwtToken:string;

    constructor(private afAuth: AngularFireAuth) {
        afAuth.idToken
            .subscribe(jwt => this.authJwtToken = jwt);
    }

}
