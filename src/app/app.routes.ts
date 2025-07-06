import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ArticleComponentComponent } from './article-component/article-component.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuardFn } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuardFn]},
    {path: 'article/:id', component: ArticleComponentComponent },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {path: 'sign-up', component: RegisterComponent},
            {path: 'sign-in', component: SignInComponent},
            {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
        ]
    }
];
