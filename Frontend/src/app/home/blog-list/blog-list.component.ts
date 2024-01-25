import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  articles: any;


  constructor(private arc:ArticleService) {}
  
  ngOnInit(): void {
    this.arc.getAllArticles().subscribe(
      (res) => {
        console.log(res);
        this.articles = res;
      },
      (err) => {
        console.log(err);
      }
    );
  
  }
  
  }

