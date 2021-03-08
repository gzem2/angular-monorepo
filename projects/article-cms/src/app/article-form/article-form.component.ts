import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Article } from '../shared/article';
import { ArticleEditService } from '../shared/article-edit.service';
import { ArticlesService } from '../shared/articles.service';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.sass']
})
export class ArticleFormComponent {
  @Input() newArticle: boolean = false;
  @Output() createdArticle = new EventEmitter<Article>();

  constructor(
    private articlesService: ArticlesService,
    private articleEditService: ArticleEditService
  ) { }

  public model: Article = (typeof this.articleEditService.model === 'undefined') ? {id:0,title:"",content:""} : this.articleEditService.model;
  public newArticleForm: boolean = false;

  onSubmit() {
    this.articlesService.updateArticle(this.model).subscribe((data) => {
      this.articleEditService.showEditor = 0;
    });
  }

  onSubmitNew() {
    this.articlesService.createArticle(this.model).subscribe((data) => {
      this.createdArticle.emit(data);
    });
  }

  onCancel() {
    this.articleEditService.showEditor = 0;
  }

}
