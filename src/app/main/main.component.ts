import { Component, OnInit , ViewChild} from '@angular/core';
import { PostsService } from './posts/posts.service';
import {Router} from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { FollowInfo } from './follow-info';
import { HttpClient } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { ObjectUnsubscribedError } from 'rxjs';

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
  followavatar:string;
  followForm:FormGroup;
  hidden:boolean;
  
  selectfollow: any;
  existuser: boolean;

  constructor(private router: Router,private pServ:PostsService,private http: HttpClient,private cServ: CookieService) {

    this.hidden = false;

    this.staForm = new FormGroup({ 
      sta: new FormControl('',[]),
    });

    this.followForm = new FormGroup({ 
      fol: new FormControl('',[]),
    });
    
    this.pServ.Userstatus().subscribe(res=>{
      this.username = Object.values(res)[0];
      this.userstatus = Object.values(res)[1];
    });

      this.currentdata = JSON.parse(this.cServ.get('maincookie'));
    this.existuser = false;

  }

  ngOnInit(): void {
    this.pServ.Userfollwing().subscribe(res=>{
      Object.values(res)[1].forEach(entry=>{
        let i = 1;
        this.pServ.Userstatus(entry).subscribe(data=>{
          this.pServ.Useravatar(entry).subscribe(img =>{
            this.profiles.push(new FollowInfo(i,Object.values(img)[1],entry, Object.values(data)[1]))
            i = i+1;
          })
      })})

    });

    
  }

  get status(){
    return this.staForm.get('sta')!;
  }
  get morefollow(){
    return this.followForm.get('fol')!;
  }
  
  updatestatus(){
    this.pServ.Newstatus(this.status.value).subscribe(res=>{
      this.userstatus = Object.values(res)[1];
    });
    this.staForm.reset();
  }
  
  toLanding(){
    this.pServ.logoutUser().subscribe(res=>{
      console.log(Object.values(res)[1])
    })
    this.router.navigate(['/auth']);
  }

  toProfile(){
    this.router.navigate(['/profile']);
  }

  add() {
    this.pServ.Newfollowing(this.morefollow.value).subscribe(res=>{
      if(Object.entries(res).length!=3){
        if(Object.values(res)[1].length == this.profiles.length){
          //console.log("already following!") //here wait to transfer to error msg.
        }
        else{
        this.existuser = false;
        this.pServ.Userstatus(this.morefollow.value).subscribe(data=>{
          this.pServ.Useravatar(Object.values(data)[0]).subscribe(img =>{
            this.profiles.push(new FollowInfo(this.profiles.length,Object.values(img)[1], Object.values(data)[0], Object.values(data)[1]))
            this.child.searchfeed(Object.values(data)[0]);
         })
      })}
        this.followForm.reset();
      }
      else{
        this.existuser = true;
        console.log(this.existuser);
        this.followForm.reset();
      }
    })

  }

  unfollow(profile){
    this.profiles = this.profiles.filter(p => p.followname != profile.followname);
    this.pServ.Deletefollowing(profile.followname).subscribe(res=>{
    })
    this.child.deletefollowfeed(profile)
  }
  


}
