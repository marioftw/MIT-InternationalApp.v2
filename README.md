
PLEASE NOTE: This is of a student project assessment

# Manukau Institute of Technology International Application

This repository contains the code for the student industry project created by Mario Aguirre Lopez (150000053) for the Manukau Institute of Technology in Auckland, New Zealand.

## Pre-requisites

Get and install NodeJS and an IDE of your choice.

IMPORTANT: Please use Node 14 LST (Long Term Support version). The current version is noit recomemded as it doesn't work as well with the Angular CLI, Angular Fire and other tools.

## Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 

## How To install this repository

Install the master branch using the following commands:

    git clone https://github.com/marioftw/MIT-InternationalApp.v2

    cd MIT-InternationalApp.v2

    npm ci

Note: It's recommended to run npm ci, instead of npm install. This will ensure that the exact dependency versions set on package-lock.json are used, unlike npm install which might potentially change those versions.

## Run the Development UI Server

To run the frontend part of the code use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

## Installing Firebase

If not installed already, run the follwing command to install Firebase (this will initialize a Firebase project within the especified directory):

    firebase init

When asked about Firebase CLI features to install select the following: Firestore, Functions, Hosting, Storage, Emulators(only install if you plan to use it for further developemnt).

When prompted select existing project: MITInternationalApp.

When prompted to replace already existing files select No (otherwise firebase files within the project will be replace with empty ones).

## Deploying the site

On the console wirte the following command to build the production enviroment (Make sure to always do this before deploying):

    ng build --configuration production

If you have updated the Functions folder, always run the following command within the folder directory before deploying :

    npm run build

To deploy the site to Firebase run:

    firebase deploy




