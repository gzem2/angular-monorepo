import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/article';
import { ArticlesService } from '../shared/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.sass']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articlesService.getArticles()
      .subscribe(articles => this.articles = articles.reverse());
  }

  articleNew(a: Article) {
    this.articles.unshift(a);
  }

  deleteArticle(id: number): void {
    this.articles = this.articles.filter(function (obj) {
      return obj.id !== id;
    });
  }
}
