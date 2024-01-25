import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-updatearticle',
  templateUrl: './updatearticle.component.html',
  styleUrls: ['./updatearticle.component.css']
})
export class UpdatearticleComponent implements OnInit {
  article: any = {
    title: '',
    description: '',
    categorie: [],
    image: ''  // Add the image property
  };
  
  image: any;
  cat: any ='';
  id: any;

  selectImage(e: any) {
    this.image = e.target.files[0];
    console.log(this.image);
  }

  constructor(
    private arc: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.arc.getArticleById(this.id).subscribe(
      (res) => {
        this.article = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    let fd = new FormData();
    fd.append('title', this.article.title);
    fd.append('description', this.article.description);
    fd.append('categorie', this.article.categorie.toString());
    fd.append('image', this.image);
  
    this.arc.updateArticle(this.id, fd).subscribe(
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