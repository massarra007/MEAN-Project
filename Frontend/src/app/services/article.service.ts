import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {

  }
  private url = 'http://127.0.0.1:3000/article/';
  articles: any[] = [];

  createNewArticle(article: any){
   return this.http.post (this.url + 'create' , article);
  }

  getAllArticles(){
   return this.http.get (this.url + 'all');
  }

  getArticlesByIdUser(id : any){
    return this.http.get (this.url + 'getbyiduser/' + id);
  }

  deleteArticle(id: any) {
    return this.http.delete(`${this.url}supprimer/${id}`);
  }

  getArticleById (id: any){
   return this.http.get (this.url +'getbyid/' + id);
  }

  updateArticle(id: any, article: any){
    return this.http.put(`${this.url}update/${id}`, article);
  }  

}

