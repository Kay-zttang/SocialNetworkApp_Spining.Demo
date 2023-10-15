import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../main/posts/posts.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  checkuser: boolean;
  warningname: boolean;
  warningpwd: boolean;

  constructor( private router: Router,private http: HttpClient,private tServ:PostsService ) {
    this.checkuser = false;
    this.warningname = false;
    this.warningpwd = false;
    this.loginForm = new FormGroup({ 
      username: new FormControl('',[
        Validators.required]),
      pwd: new FormControl('',[
        Validators.required]),
    })
  }
  ngOnInit(): void {
  }
  
  onLogin(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(response =>{
      let array = Object.values(response);
      let ind = array.findIndex(o => o.username == this.loginForm.value.username );
      if(ind != -1){
      if(this.loginForm.value.pwd==array[ind].address.street){
        this.checkuser = true;
        this.warningpwd = false;
        this.tServ.setData(array[ind]);
        this.router.navigate(['/main']);
      }
      else{
        this.warningpwd = true;
        this.loginForm.reset();
      };}else{
        this.warningname = true;
        this.loginForm.reset();
      }
  });}

  get username() { return this.loginForm.get('username')!; }
  get userpwd() {return this.loginForm.get('pwd')!;}

 
}

