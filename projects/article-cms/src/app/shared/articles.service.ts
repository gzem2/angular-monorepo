import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Article } from './article';
import { PageData } from './page-data';

@Injectable({ providedIn: 'root' })
export class ArticlesService {

    private articlesUrl = 'http://localhost:8000/api/v1/article';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getArticles(): Observable<Article[]> {
        const url = `${this.articlesUrl}s`;
        return this.http.get<Article[]>(url).pipe(
            tap(_ => this.log('fetched articles')),
            catchError(this.handleError<Article[]>('getArticles', []))
        );
    }

    getPage(pagenum: number): Observable<PageData> {
        const url = `${this.articlesUrl}s/page?page=${pagenum}`;
        return this.http.get(url).pipe(
            tap(_ => this.log('fetched page')),
            catchError(this.handleError('getPage')),
            map(data => <PageData>data)
        );
    }

    getArticle(id: number): Observable<Article> {
        const url = `${this.articlesUrl}/${id}`;
        return this.http.get<Article>(url).pipe(
            tap(_ => this.log(`fetched article id=${id}`)),
            catchError(this.handleError<Article>(`getArticle id=${id}`))
        );
    }

    createArticle(article: Article): Observable<Article> {
        return this.http.post<Article>(this.articlesUrl, article, this.httpOptions).pipe(
            tap((newArticle: Article) => this.log(`added article w/ id=${newArticle.id}`)),
            catchError(this.handleError<Article>('addArticle'))
        );
    }

    deleteArticle(article: Article | number): Observable<Article> {
        const id = typeof article === 'number' ? article : article.id;
        const url = `${this.articlesUrl}/${id}`;

        return this.http.delete<Article>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted article id=${id}`)),
            catchError(this.handleError<Article>('deleteArticle'))
        );
    }

    updateArticle(article: Article): Observable<any> {
        const id = article.id;
        const url = `${this.articlesUrl}/${id}`;

        return this.http.put<Article>(url, article, this.httpOptions).pipe(
            tap(_ => this.log(`updated article id=${article.id}`)),
            catchError(this.handleError<any>('updateArticle'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }
}