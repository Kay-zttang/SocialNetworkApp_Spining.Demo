import { Component, OnInit , ViewChild} from '@angular/core';
import { PostsService } from './posts/posts.service';
import {Router} from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { FollowInfo } from './follow-info';
import { HttpClient } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit{

  @ViewChild(PostsComponent) child: PostsComponent;

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
  
  selectfollow: any;
  existuser: boolean;

  constructor(private router: Router,private pServ:PostsService,private http: HttpClient,private cServ: CookieService) {

    this.hidden = false;
    this.userstatus = "No status posted."

    this.staForm = new FormGroup({ 
      sta: new FormControl('',[]),
    });

    this.followForm = new FormGroup({ 
      fol: new FormControl('',[]),
    });
    
      this.currentdata = JSON.parse(this.cServ.get('maincookie'));
    this.existuser = false;

  }

  ngOnInit(): void {
    if(this.currentdata.id!=undefined){
      this.username = this.currentdata.name;
      this.userid = this.currentdata.id;
      this.searchfollow((this.userid+1)>10? (this.userid-9):(this.userid+1));
      this.searchfollow((this.userid+2)>10? (this.userid-8):(this.userid+2));
      this.searchfollow((this.userid+3)>10? (this.userid-7):(this.userid+3));  
      if(this.cServ.get('stacookie').length == 0){
        this.userstatus = this.currentdata.company.catchPhrase
      }
      else{
        this.userstatus = this.cServ.get('stacookie')
      }
      
    }
    else{
      this.username = this.currentdata.name;
      if(this.cServ.get('stacookie').length != 0){
        this.userstatus = this.cServ.get('stacookie')
      }
    }
  }

  get status(){
    return this.staForm.get('sta')!;
  }
  get morefollow(){
    return this.followForm.get('fol')!;
  }
  
  updatestatus(){
    this.userstatus = this.status.value;
    this.cServ.set('stacookie', this.userstatus);
    this.staForm.reset()
  }
  
  toLanding(){
    this.cServ.deleteAll();
    this.router.navigate(['/auth']);
  }

  toProfile(){
    this.router.navigate(['/profile']);
  }

  SetCookies(){
    this.cServ.set('maincookie', JSON.stringify(this.currentdata))
  }

  add() {
    this.pServ.unData(this.morefollow.value).subscribe(data=>{
      console.log(data);
      if(data.length!=0){
      this.existuser = false;
      this.selectfollow = data;
      this.child.searchfeedfol(data[0].id,data[0].name);
      this.profiles.push(new FollowInfo(this.selectfollow.id,"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=2000&t=st=1697213729~exp=1697214329~hmac=fdb0aa51adee2af3489a46c272b1050e369dbfa2d25161a457dc57754e55beef",
      data[0].name, this.selectfollow[0].company.catchPhrase));
      this.followForm.reset();}
      else{
        this.existuser = true;
        console.log(this.existuser);
        this.followForm.reset();
      }
  })
  }

  searchfollow(id:number){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(response =>{
      let array = Object.values(response);
      let ind = array.findIndex(o => o.id == id );
      this.followname = array[ind].name;
      this.followstatus = array[ind].company.catchPhrase;
      this.profiles.push(new FollowInfo(array[ind].id,"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=2000&t=st=1697213729~exp=1697214329~hmac=fdb0aa51adee2af3489a46c272b1050e369dbfa2d25161a457dc57754e55beef",
      this.followname, this.followstatus))
      this.child.searchfeed(array[ind].id,this.followname)
    })
  }

  unfollow(profile){
    this.profiles = this.profiles.filter(p => p.followname != profile.followname);
    this.child.deletefollowfeed(profile)
    console.log(profile)
  }
  

  followadd(id, name, followstatus){
    this.profiles.push(new FollowInfo(id,"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=2000&t=st=1697213729~exp=1697214329~hmac=fdb0aa51adee2af3489a46c272b1050e369dbfa2d25161a457dc57754e55beef",
      name, followstatus))
      this.child.searchfeedfol(id,name);
  }

  

}
