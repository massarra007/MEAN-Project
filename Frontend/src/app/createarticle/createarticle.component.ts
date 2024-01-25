import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css'],
})
export class CreatearticleComponent implements OnInit {
  article: any = {
    title: '',
    description: '',
    categorie: []
  };

  image: any;
  cat: any ='';

  selectImage(e: any) {
    this.image = e.target.files[0];
    console.log(this.image);
  }

  constructor(private _auth: AuthService, private arc: ArticleService, private router:Router) {}

  ngOnInit(): void {}

  create() {
    let fd = new FormData();
    fd.append('title', this.article.title);
    fd.append('description', this.article.description);
    fd.append('categorie', this.article.categorie.toString());
    fd.append('image', this.image);
    fd.append('idUser', this._auth.getUserDataFromToken()._id);

    this.arc.createNewArticle(fd)
    .subscribe(
      res=>{
        this.router.navigate(['/home']);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
