import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { ArticlesService } from "../articles.service";
import { ArticleCard } from '../card/article-card';
import { ChangeDetectorRef } from '@angular/core';
import { Subject, debounceTime, filter, fromEvent, scan, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { getAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  page = 0; // начинаем с нулевой страницы
  data: ArticleCard[] = []; // Массив для данных
  loading = false; 
  userName: string | null = null;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private articlesService: ArticlesService,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router) {} 
  // конструктор дает компоненту доступ к ArticlesService
  ngOnInit() { // метод, который вызывается 1 раз, когда компонент готов к работе
    this.userName = getAuth().currentUser?.displayName || null;
    fromEvent(window, 'scroll')
    .pipe(
      debounceTime(500),
      startWith(undefined),
      filter(() => {
        // Проверяем, пустой ли массив data
        if (this.data.length === 0) {
          return true;  // Грузим первую страницу
        }
        // Проверяем, не идёт ли загрузка
        if (!this.loading) {
          // Вычисляем позицию скролла и высоту страницы
          const scrollPosition = window.innerHeight + window.scrollY; // Высота видимой части окна + сколько я прокрутил вниз
          const pageHeight = document.documentElement.offsetHeight; // Полная высота страницы
          // Проверяем, доскроллили ли до конца
          return scrollPosition >= pageHeight - 50;
        }
        return false;
      }),
      tap(() => {
        this.loading = true;
      }),
      switchMap(() =>
        this.articlesService.getArticlesList(this.page)
      ),
      scan((allCards, newArticles) => {
        const newCards = newArticles.map((item: { id: number; title: string; description: string; social_image: string; }) => new ArticleCard(
          item.id,
          item.title,
          item.description,
          item.social_image
        ));
        return allCards.concat(newCards);
      },[]),
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(allCards => {
      // Обрабатываем данные 
      this.loading = false; // Выключаем спиннер
      this.page = this.page + 1; // Увеличиваем страницу
      this.data = allCards; // Сохраняем карточки
      this.changeDetectorRef.detectChanges(); // Обновляем интерфейс
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onSignOut() {
    this.authService.signOut().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: () => {
        this.router.navigate(['auth/sign-in']);
      }
    });
  }
}