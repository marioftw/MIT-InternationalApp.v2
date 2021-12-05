import * as functions from "firebase-functions";
import {createUserApp} from "./create-user";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
});

export const createUser = functions.https.onRequest(createUserApp);

export const onFirstTimeSignInAddNewUser = 
    functions
        .runWith({
            timeoutSeconds: 300,
            memory: "128MB"
        })
        .firestore.document("users/{email}")
        .onCreate(async (snap,context) => {
            functions.logger.debug(
                `Running first time sign in add new user function ${context.params.email}`
            );
        })