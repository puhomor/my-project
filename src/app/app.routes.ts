import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ArticleComponentComponent } from './article-component/article-component.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'article/:id', component: ArticleComponentComponent }
];
