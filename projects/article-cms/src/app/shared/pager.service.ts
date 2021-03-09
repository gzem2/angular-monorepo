import { Injectable } from '@angular/core';
import { ArticlesService } from './articles.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PageData } from './page-data';
import { Article } from './article';

@Injectable({ providedIn: 'root' })
export class PagerService {
    currentPage: number = 1;
    pageData!: PageData;
    pageData$!: BehaviorSubject<PageData>;
    currentArticles$!: BehaviorSubject<Article[]>;
    oldArticles: Article[] = [];

    constructor(
        private articlesService: ArticlesService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {
        this.pageData$ = <BehaviorSubject<PageData>>new BehaviorSubject(this.pageData);
        this.currentArticles$ = <BehaviorSubject<Article[]>>new BehaviorSubject([{id:0,title:'',content:''}]);

        this.activatedRoute.queryParams.subscribe(params => {
            let page = params['page'];
            this.currentPage = page ? parseInt(page) : 1;
            this.getPage(this.currentPage);
        });
    }

    getPage(pagenum: number) {
        this.articlesService.getPage(pagenum)
            .subscribe(pd => {
                this.pageData = pd;
                this.currentArticles$.subscribe(arts => this.oldArticles = arts);
                this.pageData$.next(pd);
                if(pd['data'])
                    this.currentArticles$.next(pd['data']);
                
                this.currentPage = pagenum;
                this.location.go(pagenum == 1 ? "/" : "/?page=" + pagenum.toString());
            });
    }

    subscribe(): Observable<PageData> {
        return this.pageData$.asObservable();
    }

    subscribeToArticles(): Observable<Article[]> {
        return this.currentArticles$.asObservable();
    }

    getPageNumFromUrl(url: string): number {
        return parseInt(url.split("?page=")[1])
    }
}
