// MAL: reference to firebase admin package
const { auth } = require('firebase-admin');
const admin = require ('firebase-admin');

// MAL: taking two arguments from console: 1. full path to service account 2. unique user identifier to set admin account
const serviceAccountPath = process.argv[2], userUid = process.argv[3];

// MAL: DELETE console log for testing only
console.log(`Using service account ${serviceAccountPath}.`);
console.log(`Setting user ${userUid} as admin.`);

// MAL: specifinig the service account to use
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
})

// MAL: custom user claims
async function initAdmin(adminUid){
    admin.auth().setCustomUserClaims(adminUid, {admin:true});
    // MAL: DELETE console log for testing only
    console.log(`User is now an admin.`);
}

// MAL: this function takes the user id 
initAdmin(userUid)
    .then(() => {
        // MAL: DELETE console log for testing only
        console.log(`Exiting.`);
        process.exit();
    })