import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { PostsService } from '../main/posts/posts.service';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

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
  jsonusers:any;
  selectuser: any;
  checkregi = true;

  constructor( private router: Router,private cServ: CookieService, private aServ:AuthService) {
    this.checkuser = false;
    this.warningname = false;
    this.warningpwd = false;
    this.loginForm = new FormGroup({ 
      username: new FormControl('',[
        Validators.required]),
      pwd: new FormControl('',[
        Validators.required]),
    })
    this.cServ.deleteAll();
    

    
  }
  ngOnInit(): void {
  
    
  }
  
  onLogin() {
    this.aServ.getData(this.loginForm.value.username).subscribe(data =>{
      this.selectuser = data;
      this.check();
      this.checkregi =  this.checkuser;
      console.log(this.checkuser);
      console.log(this.warningpwd);
      console.log(this.warningname);
      console.log(this.checkregi);
     });
     
     }
   

  get username() { return this.loginForm.get('username')!; }
  get userpwd() {return this.loginForm.get('pwd')!;}

  check(){
    if(this.selectuser.length == 1){
      if(this.selectuser[0].address.street == this.loginForm.value.pwd){
        this.checkuser = true;
        this.warningpwd = false;
        this.cServ.set('maincookie', JSON.stringify(this.selectuser[0]))
        this.router.navigate(['/main']);
      }
      else{
        this.warningpwd = true;
        this.loginForm.reset();
      }
    }
    else{
      this.warningname = true;
      this.loginForm.reset();
    }
  }
 
}

