import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../shared/article';
import { ArticleEditService } from '../shared/article-edit.service';
import { ArticlesService } from '../shared/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent {
  @Input() article!: Article;
  @Output() articleDelete = new EventEmitter<number>();

  constructor(
    private articlesService: ArticlesService,
    private articleEditService: ArticleEditService,
  ) { }

  editArticle() {
    this.articleEditService.model = this.article;
    this.articleEditService.showEditor = this.article.id;
  }

  deleteArticle() {
    this.articlesService.deleteArticle(this.article.id).subscribe((data) => {
      this.articleDelete.emit(this.article.id);
    });
  }

  public get showEditor(): number {
    return this.articleEditService.showEditor;
  }
}