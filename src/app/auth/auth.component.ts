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
    this.aServ.loginUser(this.loginForm.value.username, this.loginForm.value.pwd).subscribe(
      res => {
        let msg = Object.values(res);
        if(msg[1]=='success'){
          //console.log('correct login')
          this.checkuser = true;
          this.warningpwd = false;
          this.router.navigate(['/main']);
        }
        else if(msg[1]=='password not correct'){
          this.warningpwd = true;
          this.loginForm.reset();
        }
        else if(msg[1]=='user does not exist'){
          this.warningname = true;
          this.loginForm.reset();
        }
      });
     
     }
   

  get username() { return this.loginForm.get('username')!; }
  get userpwd() {return this.loginForm.get('pwd')!;}
 
}

