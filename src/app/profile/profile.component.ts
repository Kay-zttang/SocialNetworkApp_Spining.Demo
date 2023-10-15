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
  usernm: string;
  useremail: string;
  usertel: string;
  userzip: string;
  userpwd: string;
  updateForm: FormGroup;


  constructor(private router: Router, private pServ: ProfileService, private cServ: CookieService) {
    this.profiledata = this.pServ.getData();
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
      this.SetCookies();
    }
    else{
      this.usernm = this.cServ.get('infonm');
      this.useremail = this.cServ.get('infoemail');
      this.usertel = this.cServ.get('infophone');
      this.userzip = this.cServ.get('infozip')
      this.userpwd = this.cServ.get('infopwd')
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
      this.usernm = this.updatenm.value;
      this.cServ.set('infonm', this.usernm)
    }
    if(this.updateemail.value){
      this.useremail = this.updateemail.value;
      this.cServ.set('infoemail', this.useremail)
    }
    if(this.updatetel.value){
      this.usertel = this.updatetel.value;
      this.cServ.set('infophone', this.usertel)
    }
    if(this.updatezip.value){
      this.userzip = this.updatezip.value;
      this.cServ.set('infozip', this.userzip)
    }
    if(this.updatepwd.value){
      this.userpwd = this.updatepwd.value;
      this.cServ.set('infopwd', this.userpwd)
    }
    
    this.updateForm.reset();
  }

  toMain(){
    this.pServ.setData(this.profiledata);
    this.cServ.deleteAll;
    this.router.navigate(['/main']);
  }

  SetCookies(){
    this.cServ.set('usercookie', JSON.stringify(this.profiledata))
    this.cServ.set('infonm', this.usernm)
    this.cServ.set('infoemail', this.useremail)
    this.cServ.set('infophone', this.usertel)
    this.cServ.set('infozip', this.userzip)
    this.cServ.set('infopwd', this.userpwd)
  }

  

}
