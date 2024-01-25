import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    lastname: '',
    email: '',
    password: '',
  };

  image: any;

  select(e: any) {
    this.image = e.target.files[0];
  }

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    let fd = new FormData();
    fd.append('name', this.user.name);
    fd.append('lastname', this.user.lastname);
    fd.append('email', this.user.email);
    fd.append('password', this.user.password);
    fd.append('image', this.image);

    this._auth.register(fd)
    .subscribe(
      res=>{
        this.router.navigate(['/login']);
      }
    );
  }
}
