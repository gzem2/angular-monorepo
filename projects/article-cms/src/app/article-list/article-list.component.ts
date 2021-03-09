import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../shared/article';
import { PagerService } from '../shared/pager.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.sass']
})
export class ArticleListComponent implements OnInit {
  articles$!: Observable<Article[]>;

  constructor(private pagerService: PagerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getArticles();
  }

  ngAfterViewInit(): void {
    this.articles$.subscribe(a => {
      if (a.length !== this.pagerService.oldArticles.length) {
        console.log('list height mismatch');
        setTimeout(() => {
          window.scrollTo({left: 0, top:document.body.scrollHeight, behavior: 'smooth'});
        }, 100);
      }
    });
  }

  getArticles() {
    this.articles$ = this.pagerService.subscribeToArticles();
  }
}
