import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PostsService } from './posts.service';
import { Router } from '@angular/router';
import { FeedInfo } from './feed-info';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit{
  @Input() message : number;
  documents: FeedInfo[]=[];
  feedForm: FormGroup;
  loginuser: string;
  currenttimestamp: any;
  currenttime: any;
  searchText=undefined;
  feedother: any;
  crycomment: any;

       
  constructor( private pServ: PostsService,private router:Router,
    private http: HttpClient,private cServ: CookieService) {
      this.feedForm = new FormGroup({ 
      newfeed: new FormControl('',[]),
    }); 
   }

   
  ngOnInit(): void {

    this.pServ.Userarticle().subscribe(res=>{
      let i = 1;
      Object.values(res)[0].forEach(entry=>{
        this.loginuser = entry.author; 
        this.documents.push(new FeedInfo(entry.pic,
        entry.id, entry.author, entry.text, new Date(entry.date).toDateString(), Date.parse(entry.date), null));
        this.checkorder()
       ;})
    })
  }


  get newfeed(){
    return this.feedForm.get('newfeed')!;
  }

  resetpost(){
    this.feedForm.reset();
  }

  addfeed(){
    if(this.newfeed.value){
      this.pServ.Addarticle(this.newfeed.value).subscribe(res=>{
        console.log(res);
        this.currenttimestamp = new Date().getTime();
        this.currenttime = new Date().toDateString();
        this.documents.push(new FeedInfo('https://img.freepik.com/free-psd/3d-rendering-firefighter-icon_23-2149859727.jpg?w=996&t=st=1698484207~exp=1698484807~hmac=ff42f9de4fd2a6c3d566bb0bbc13fef1e146e83d1926f871ed2e7bf374b10bbb', 
        this.documents.length.toString(),this.loginuser, this.newfeed.value, this.currenttime, this.currenttimestamp, null));
        this.checkorder();
        this.feedForm.reset();
      })
    }
    return   
  }

  searchfeed(name:string){
    this.pServ.Userarticle(name).subscribe(data => {
      if(Object.values(data)[0]!='no such article'){
        Object.values(data)[0].forEach(entry=>{
          this.documents.push(new FeedInfo(entry.pic,
            entry.id, entry.author, entry.text, new Date(entry.date).toDateString(), Date.parse(entry.date), null));
            this.checkorder();
        })
      }
    })
  }

  
  checkorder(){
    this.documents.sort(function(y, x){
      return x.timestamp - y.timestamp;
  })
  }

  deletefollowfeed(profile){
    let tmp = profile.followname;
    this.documents = this.documents.filter(d => d.feedauthor != tmp);

  }



    
  

}