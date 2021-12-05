// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  useEmulators: false,
  firebase: {
    apiKey: "AIzaSyB102O6W-_s2_BGJbOh-7QRjig9DlZtl-Y",
    authDomain: "mitinternationalapp.firebaseapp.com",
    projectId: "mitinternationalapp",
    storageBucket: "mitinternationalapp.appspot.com",
    messagingSenderId: "665220385726",
    appId: "1:665220385726:web:8f9f75aeba614f372607ef"
  },
  api: {
    createUser: ""
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
