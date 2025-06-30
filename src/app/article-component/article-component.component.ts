import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from './article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-component',
  imports: [CommonModule],
  templateUrl: './article-component.component.html',
  styleUrl: './article-component.component.css'
})
export class ArticleComponentComponent {
  article: Article | null = null; // добавили параметр
  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем id из маршрута
    if (id) { // проверка нашелся ли айдишник
      this.articlesService.getArticle(+id).subscribe({
        next: (data: any) => {
          this.article = null; // очищаем article перед сохранением
          this.article = new Article(data.body_html, data.social_image); // Сохраняем данные статьи
        }
      });
    }
  }
}
