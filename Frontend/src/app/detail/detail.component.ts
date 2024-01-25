import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

id: any;
article: any;

  constructor(private act:ActivatedRoute, private arc:ArticleService, private router:Router, public _auth: AuthService) {}
  
  ngOnInit(): void {
  this.id=this.act.snapshot.paramMap.get('id');

  this.arc.getArticleById(this.id).subscribe(
    res=>{
      this.article = res;
    }
  )
  }
  delete(id: any) {
    this.arc.deleteArticle(id).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  }