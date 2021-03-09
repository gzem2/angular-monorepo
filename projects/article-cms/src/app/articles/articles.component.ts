import { Component, Input } from '@angular/core';
import { Article } from '../shared/article';
import { ArticleEditService } from '../shared/article-edit.service';
import { ArticlesService } from '../shared/articles.service';
import { PagerService } from '../shared/pager.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent {
  @Input() article!: Article;

  constructor(
    private articlesService: ArticlesService,
    private articleEditService: ArticleEditService,
    private pagerService: PagerService
  ) { }

  editArticle() {
    this.articleEditService.model = this.article;
    this.articleEditService.showEditor = this.article.id;
  }

  deleteArticle() {
    this.articlesService.deleteArticle(this.article.id).subscribe((data) => {
      this.pagerService.getPage(this.pagerService.currentPage);
    });
  }

  public get showEditor(): number {
    return this.articleEditService.showEditor;
  }
}