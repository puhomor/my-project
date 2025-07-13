import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn$$.asObservable();

  constructor(private afAuth: AngularFireAuth) { }

  signIn(_credentials: { email: string, password: string }): void {
    this.isLoggedIn$$.next(true);
  }

  signUp(email: string, password: string, name: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }
}