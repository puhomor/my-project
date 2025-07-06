import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyB-2ZgDTDAp3o-SY2XZlworqoiaK9sPoZ4",
  authDomain: "my-project-4d184.firebaseapp.com",
  projectId: "my-project-4d184",
  storageBucket: "my-project-4d184.firebasestorage.app",
  messagingSenderId: "93881565397",
  appId: "1:93881565397:web:0182ad52489ece3037625c"
};
const app = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient()
  ]
};
