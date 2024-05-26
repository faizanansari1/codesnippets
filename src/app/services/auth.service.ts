import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userID?: string;

  constructor(private route: Router) {
    this.firbaseAuthChanged();
  }

  isAuthenticated() {
    return this.userID ? true : false;
  }

  getUserID() {
    return this.userID;
  }

  createUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.route.navigate(['/']);
        console.log('SINGUP-USER', { user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('SINGUP-USER-ERROR', errorMessage);
        alert('something went wrong while create user');
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.route.navigate(['/']);
        console.log('SIGNIN-USER', { user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('SINGIN-USER-ERROR', errorMessage);
        alert('something went wrong while login user');
      });
  }

  logout() {
    const auth = getAuth();
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        signOut(auth)
          .then(() => {
            resolve();
            this.route.navigate(['/login']);
          })
          .catch((error) => {
            console.log('something went wrong while logout', error);
            alert('something went wrong while logout');
            reject(error);
          });
      }, 2000);
    });
  }

  firbaseAuthChanged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userID = user.uid;
        console.log('user login success', user.email);
      } else {
        this.userID = undefined;
        console.log('user logut', user);
      }
    });
  }
}
