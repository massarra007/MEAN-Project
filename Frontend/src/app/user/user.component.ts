import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  id: any;
  user: any;
articles: any;

  constructor(private act: ActivatedRoute, private _auth: AuthService, private arc:ArticleService) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');

    this._auth.getById(this.id).subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
    this.arc.getArticlesByIdUser(this.id).subscribe(
      res=>{
        this.articles = res;
      },
      err=>{
        console.log(err);
      }
    )
  }
}
