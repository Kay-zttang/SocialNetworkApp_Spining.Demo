import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts/posts.service';
import { ProfileService } from '../profile/profile.service';
import {Router} from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { FollowInfo } from './follow-info';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  userdata: any;
  profiledata: any;
  currentdata: any;
  currentuserid: string;

  username: any;
  userstatus: string;
  userid:number;
  staForm: FormGroup;

  profiles: FollowInfo[]=[];
  followname:string;
  followstatus:string;
  followForm:FormGroup;
  hidden:boolean;

  

  constructor(private router: Router,private tServ:PostsService,private http: HttpClient,
     private pServ: ProfileService,private cServ: CookieService) {

    this.hidden = false;
    this.userdata = this.tServ.getData();
    this.profiledata = this.pServ.getData();
    this.userstatus = "No status posted."

    this.staForm = new FormGroup({ 
      sta: new FormControl('',[]),
    });

    this.followForm = new FormGroup({ 
      fol: new FormControl('',[]),
    });


    if(this.userdata){
      this.currentdata = this.userdata;
      this.SetCookies();
    }
    else if(this.profiledata){
      this.currentdata = this.profiledata;
      this.SetCookies();
    }
    else{
      this.currentdata = JSON.parse(this.cServ.get('maincookie'));
    }

    if(this.currentdata){
      this.username = this.currentdata.name
    if(this.currentdata.id){
      this.userid = this.currentdata.id;
      this.userstatus = this.currentdata.company.catchPhrase;
      this.searchfollow((this.userid+1)>10? (this.userid-9):(this.userid+1));
      this.searchfollow((this.userid+2)>10? (this.userid-8):(this.userid+2));
      this.searchfollow((this.userid+3)>10? (this.userid-7):(this.userid+3));
      

    }

    
  }

   
    
  }

  ngOnInit(): void {
  }

  get status(){
    return this.staForm.get('sta')!;
  }
  get morefollow(){
    return this.followForm.get('fol')!;
  }
  
  updatestatus(){
    this.userstatus = this.status.value
    this.staForm.reset()
  }
  
  toLanding(){
    this.cServ.deleteAll;
    this.router.navigate(['/auth']);
  }

  toProfile(){
    this.pServ.setData(this.currentdata);
    this.router.navigate(['/profile']);
  }

  SetCookies(){
    this.cServ.set('maincookie', JSON.stringify(this.currentdata))
  }

  add() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(response =>{
      let array = Object.values(response);
      let ind = array.findIndex(o => o.name == this.morefollow.value );
      if(ind != -1){
      this.profiles.push(new FollowInfo("https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=2000&t=st=1697213729~exp=1697214329~hmac=fdb0aa51adee2af3489a46c272b1050e369dbfa2d25161a457dc57754e55beef",
      array[ind].name, array[ind].company.catchPhrase));}
      else{
      this.profiles.push(new FollowInfo("https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=1380&t=st=1697342197~exp=1697342797~hmac=95272f0eb56e74cbaa022add5787bc7e16d5ba17b5a6eb6b23f82dde19064e9b",
      this.morefollow.value, 'Chill out now!'));
      }
      this.followForm.reset();
  })
  }

  searchfollow(id:number){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(response =>{
      let array = Object.values(response);
      let ind = array.findIndex(o => o.id == id );
      this.followname = array[ind].name;
      this.followstatus = array[ind].company.catchPhrase;
      this.profiles.push(new FollowInfo("https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=2000&t=st=1697213729~exp=1697214329~hmac=fdb0aa51adee2af3489a46c272b1050e369dbfa2d25161a457dc57754e55beef",
      this.followname, this.followstatus))
  })
  }

  unfollow(profile){
    this.profiles = this.profiles.filter(p => p.followname != profile.followname)
  }

  

}
