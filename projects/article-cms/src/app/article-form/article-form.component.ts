import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from '../shared/article';
import { ArticleEditService } from '../shared/article-edit.service';
import { ArticlesService } from '../shared/articles.service';
import { PagerService } from '../shared/pager.service';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.sass']
})
export class ArticleFormComponent {
  @Input() newArticle: boolean = false;

  constructor(
    private articlesService: ArticlesService,
    private articleEditService: ArticleEditService,
    private pagerService: PagerService
  ) { }

  public model: Article = (typeof this.articleEditService.model === 'undefined') ? {id:0,title:"",content:""} : this.articleEditService.model;
  public newArticleForm: boolean = false;

  onSubmit(articleForm: NgForm) {
    this.articlesService.updateArticle(this.model).subscribe((data) => {
      this.articleEditService.showEditor = 0;
    });
  }

  onSubmitNew(articlForm: NgForm) {
    this.articlesService.createArticle(this.model).subscribe((data) => {
      this.pagerService.getPage(1);
      articlForm.resetForm();
    });
  }

  onCancel() {
    this.articleEditService.showEditor = 0;
  }

}
