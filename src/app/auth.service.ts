
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;


  constructor(private fbAuth: AngularFireAuth, private router: Router) {
    console.log('AuthService');
    this.user = fbAuth.authState;
    this.user.subscribe((user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this.fbAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  get userId() {
    if (this.userDetails == null) {
      return null;
    } else {
      return this.userDetails.uid;
    }
  }

  isLoggedIn() {
    console.log('isLoggedIn()');
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    console.log('logout()');
      this.fbAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']))
      .catch((err) => console.log(err));
    }
  }

