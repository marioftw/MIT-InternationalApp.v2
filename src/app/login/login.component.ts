import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import firebase from 'firebase/app';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    // MAL: create instance of firebaseUi into variable
    ui!: firebaseui.auth.AuthUI;

    constructor(
        // MAL: initialises FirebaseSDK first for firebaseUI to work
      private afAuth: AngularFireAuth,
      private router: Router) { 
      }

    ngOnInit() {
        // MAL: app property of FireAuth becomes a promise which will return an app object 
        // when succefuly evaluated, containing all the properties of the running SDK application
        this.afAuth.app.then(app => {
            const uiConfig = {
                signInOptions: [
                    EmailAuthProvider.PROVIDER_ID,
                    GoogleAuthProvider.PROVIDER_ID
                ],
                // MAL: when signin is succesfull run the callbacks object
                callbacks: {
                    signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
                }
            };

            // MAL: FirebaseUi constructor function that takes one argument (auth method from promise)
            this.ui = new firebaseui.auth.AuthUI(app.auth());

            // MAL: pass two arguments:
            // 1. identifier of container for FirebaseUi to run in the HTML
            // 2. ui configuration defined above 
            this.ui.start("#firebaseui-auth-container", uiConfig);

            // MAL: forces returning users to signin again
            this.ui.disableAutoSignIn();
        });

    }

    // MAL: this function will recieve a result from FirebaseUi and pass it to the callbacks fuction above
    onLoginSuccessful(result: any) {
        // MAL: DELETE console log for testing only
        // console.log('Firebase UI result:', result);
        this.router.navigateByUrl("dashboard");
    }
    
    // MAL: This destroys the FirebaseUI instance when the login component is destroyed preventing memory leaks 
    ngOnDestroy() {
    this.ui.delete();
    }
}


