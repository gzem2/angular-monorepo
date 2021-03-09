import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageData } from '../shared/page-data';
import { PagerService } from '../shared/pager.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.sass']
})
export class PagerComponent implements OnInit {
  public pageData$!: Observable<PageData>;

  constructor(
    private pagerService: PagerService,
  ) { }

  ngOnInit(): void {
    this.pageData$ = this.pagerService.subscribe();
  }

  navigate(url: string | undefined): void {
    if (url) {
      let pagenum = this.pagerService.getPageNumFromUrl(url);
      this.pagerService.getPage(pagenum ? pagenum : this.pagerService.currentPage);
    }
  }

  updateLabel(label: any) {
    if(typeof label === "string") {
      let string = label.split('.')[1];
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return label;
    }
  }

}
