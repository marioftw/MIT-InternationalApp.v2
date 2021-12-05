import {auth, db} from "./init";
import * as functions from 'firebase-functions';
import {getUserCredentialsMiddleware} from "./auth.middleware";

// Reference to the Express Library
const express = require('express');
// Express middleware to recieve Json from the HTP body of a request
const bodyParser = require('body-parser');
// Express middleware to allow cross origin request
const cors = require('cors');

// Creates the app
export const createUserApp = express();

// Endpoints
createUserApp.use(bodyParser.json());
createUserApp.use(cors({origin:true}));
createUserApp.use(getUserCredentialsMiddleware);


createUserApp.post("/", async (req: { [x: string]: any; body: { email: any; password: any; admin: any; }; }, 
    res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {

    functions.logger.debug(`Calling create user function.`);

    try {

        if (!(req["uid"] && req["admin"])) {
            const message = `Denied access to user creation service.`;
            functions.logger.debug(message);
            res.status(403).json({message});
            return;
        }

        const email = req.body.email,
            password = req.body.password,
            admin = req.body.admin;

        const user = await auth.createUser({
            email,
            password
        });

        await auth.setCustomUserClaims(user.uid, {admin});

        db.doc(`users/${user.uid}`).set({});


        res.status(200).json({message:"User created successfully."});

    }
    catch(err) {
        functions.logger.error(`Could not create user.`, err);
        res.status(500).json({message: "Could not create user."});
    }

});

