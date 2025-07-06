import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn$$.asObservable();
  constructor() { }
  signIn(_credentials: { email: string, password: string }): void {
    this.isLoggedIn$$.next(true);
  }

  signUp(_credentials: { email: string, password: string }): void { 
    this.isLoggedIn$$.next(true);
  }
}
