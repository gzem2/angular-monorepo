import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({ providedIn: 'root' })
export class ArticleEditService {
    public showEditor: number = 0;
    public model!: Article;
}