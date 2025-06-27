import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ //гарантирует, что встроенный механизм внедрения зависимостей 
  //сможет создать объект этого класса и передать его в 
  //качестве зависимости в другой объект (в другой сервис или компонент)
  providedIn: 'root'
})
export class ArticlesService {
  private baseUrl = 'https://dev.to/api/articles';

  constructor(private http: HttpClient) { }

  getArticlesList(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }

  getArticle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
