import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { ArticlesService } from "../articles.service";
import { ArticleCard } from '../card/article-card';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  page = 0; // начинаем с нулевой страницы
  data: ArticleCard[] = []; // Массив для данных
  constructor(
    private articlesService: ArticlesService,
    private changeDetectorRef: ChangeDetectorRef) {} 
  // конструктор дает компоненту доступ к ArticlesService
  ngOnInit() { // метод, который вызывается 1 раз, когда компонент готов к работе
    this.articlesService.getArticlesList(this.page).subscribe({
      next: (data: any) => {
        this.data = [] // очищаем массив, чтобы данные не дублировались
        this.data = data.map((item: any) => 
          new ArticleCard(
            item.id,
            item.title,
            item.description,
            item.social_image
          )
        );
        this.changeDetectorRef.detectChanges(); // метод по обнаружению измменений
      }
    });
  }
}