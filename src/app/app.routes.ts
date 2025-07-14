import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ArticleComponentComponent } from './article-component/article-component.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/sign-in']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent, 
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },

    {
        path: 'article/:id', 
        component: ArticleComponentComponent 
    },

    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'sign-up', 
                component: RegisterComponent,
                canActivate: [AuthGuard],
                data: {authGuardPipe: redirectLoggedInToHome}
            },

            {
                path: 'sign-in', 
                component: SignInComponent,
                canActivate: [AuthGuard],
                data: {authGuardPipe: redirectLoggedInToHome}
            },

            {
                path: '', 
                redirectTo: 'sign-in', 
                pathMatch: 'full'
            }
        ]
    }
];
