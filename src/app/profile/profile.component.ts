import { Component, OnInit} from '@angular/core';
import { ProfileService } from './profile.service';
import {Router} from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profiledata: any;
  checkusername: string;
  usernm: string;
  useravatar:string;
  useremail: string;
  usertel: string;
  userzip: string;
  userpwd: string;
  updateForm: FormGroup;


  constructor(private router: Router, private pServ: ProfileService, private cServ: CookieService,private http: HttpClient) {
    //this.profiledata = JSON.parse(this.cServ.get('maincookie'))
    this.updateForm = new FormGroup({ 
      updatenm: new FormControl('',Validators.compose([
        Validators.minLength(2)])),
      updateemail: new FormControl('',[
        Validators.email]),
      updatetel: new FormControl('',[
        Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')]),
      updatezip: new FormControl('',[
          Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]),
      updatepwd: new FormControl('',[
        Validators.minLength(8)])
    });
    
    this.pServ.Useremail().subscribe(res=>{
      this.usernm = Object.values(res)[0];
      this.useremail = Object.values(res)[1];
    });
    this.pServ.Userphone().subscribe(res=>{
      this.usertel = Object.values(res)[1];
    });
    this.pServ.Userzipcode().subscribe(res=>{
      this.userzip = Object.values(res)[1];
    })
    this.pServ.Useravatar().subscribe(res=>{
      this.useravatar = Object.values(res)[1];
    })
    
    
  }
  
  ngOnInit(): void {
  }

  get updatenm() { return this.updateForm.get('updatenm')!; }
  get updateemail() { return this.updateForm.get('updateemail')!; }
  get updatetel() { return this.updateForm.get('updatetel')!; }
  get updatezip() { return this.updateForm.get('updatezip')!; }
  get updatepwd() { return this.updateForm.get('updatepwd')!; }

  toUpdate() {
    if(this.updatenm.value){
      this.usernm = this.updatenm.value;
    }
    if(this.updateemail.value){
      this.pServ.NewEmail(this.updateemail.value).subscribe(res=>{
        this.useremail = Object.values(res)[1];
      });
    }
    if(this.updatetel.value){
      this.pServ.NewPhone(this.updatetel.value).subscribe(res=>{
        this.usertel = Object.values(res)[1];
      });
    }
    if(this.updatezip.value){
      this.pServ.NewZipcode(this.updatezip.value).subscribe(res=>{
        this.userzip = Object.values(res)[1];
      });
    }
    if(this.updatepwd.value){
      this.pServ.NewPwd(this.updatepwd.value).subscribe(res=>{
      });
    }
    
    this.updateForm.reset();
  }

  toMain(){
    this.router.navigate(['/main']);
  }

  handleImageChange(e){
    const fd = new FormData();
    fd.append('image', e.target.files[0]);
    this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/avatar", fd,{ withCredentials: true }).subscribe(res=>{
      this.useravatar = Object.values(res)[1];
    });
  }

}
