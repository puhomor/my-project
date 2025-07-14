import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn$$.asObservable();

  constructor(private afAuth: AngularFireAuth) { }

  signIn(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  signUp(email: string, password: string, name: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap((credential) => {
        if (credential.user) {
          credential.user.updateProfile({ displayName: name });
        }
      })
    );
  }

  signOut(): Observable<any> {
    return from(this.afAuth.signOut());
  }
}