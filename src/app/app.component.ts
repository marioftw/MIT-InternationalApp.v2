import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {concatMap, filter, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'InternationalApp';

  constructor() {

  }

  ngOnInit() {

  }

}
