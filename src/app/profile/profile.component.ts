import { Component, OnInit} from '@angular/core';
import { ProfileService } from './profile.service';
import {Router} from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  useremail: string;
  usertel: string;
  userzip: string;
  userpwd: string;
  updateForm: FormGroup;


  constructor(private router: Router, private pServ: ProfileService, private cServ: CookieService) {
    this.profiledata = JSON.parse(this.cServ.get('maincookie'))
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
    
    
    if(this.profiledata){
      this.checkusername = this.profiledata.username;
      this.usernm = this.profiledata.name;
      this.useremail = this.profiledata.email;
      this.usertel = this.profiledata.phone;
      if(this.profiledata.zip){
        this.userzip = this.profiledata.zip;
        this.userpwd = this.profiledata.pwd;
      }
      else{
        this.userzip = this.profiledata.address.zipcode;
        this.userpwd = this.profiledata.address.street;
      }
    }
    
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
      this.usernm = this.updatenm.value
    }
    if(this.updateemail.value){
      this.useremail = this.updateemail.value
    }
    if(this.updatetel.value){
      this.usertel = this.updatetel.value
    }
    if(this.updatezip.value){
      this.userzip = this.updatezip.value
    }
    if(this.updatepwd.value){
      this.userpwd = this.updatepwd.value
    }
    
    this.updateForm.reset();
  }

  toMain(){
    this.router.navigate(['/main']);
  }

  

}
