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
  feedid: any;
  feedauthor: string;
  feedtext: string;
  feedcomment: string;
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
    
    this.feedid = JSON.parse(this.cServ.get('maincookie'));
    
   }

   
  ngOnInit(): void {

    if(this.feedid.id >= 1){
      this.searchfeed(this.feedid.id, this.feedid.name);}
  }


  get newfeed(){
    return this.feedForm.get('newfeed')!;
  }

  resetpost(){
    this.feedForm.reset();
  }

  addfeed(){
    if(this.newfeed.value){
      this.currenttimestamp = new Date().getTime() ;
      this.currenttime = new Date().toLocaleString();
      this.documents.push(new FeedInfo('https://img.freepik.com/free-psd/3d-rendering-firefighter-icon_23-2149859727.jpg?w=996&t=st=1698484207~exp=1698484807~hmac=ff42f9de4fd2a6c3d566bb0bbc13fef1e146e83d1926f871ed2e7bf374b10bbb', 
      '0',this.feedid.name, this.newfeed.value, this.currenttime, this.currenttimestamp, null));
      this.checkorder();
      this.feedForm.reset();
    }
    return   
  }

  searchfeed(id: number, name:string){
    this.pServ.fData(id).subscribe(data => {
      data.forEach(entry=>{
        this.currenttimestamp = new Date().getTime();
        this.currenttime = new Date().toLocaleString();
        this.pServ.commentData(entry.id).subscribe(data => {
          this.crycomment = data;
          this.documents.push(new FeedInfo("https://img.freepik.com/free-vector/like-icon-3d-vector-illustration-heart-symbol-red-bubble-social-media-applications-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1695.jpg?w=2000&t=st=1697266355~exp=1697266955~hmac=10afedcd5d406fd57a8a692d69fe82194856665219d047a56fa83ee623eaca3e",
        entry.id,name, entry.body, this.currenttime, this.currenttimestamp, this.crycomment));
          this.checkorder();})
       ;})
    })
  }

  searchfeedfol(id: any, name:string){
    this.pServ.fData(id).subscribe(data => {
      data.forEach(entry=>{
        this.currenttimestamp = new Date().getTime();
        this.currenttime = new Date().toLocaleString();
        this.pServ.commentData(entry.id).subscribe(data => {
          this.crycomment = data;
          this.documents.push(new FeedInfo("https://img.freepik.com/free-vector/like-icon-3d-vector-illustration-heart-symbol-red-bubble-social-media-applications-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1695.jpg?w=2000&t=st=1697266355~exp=1697266955~hmac=10afedcd5d406fd57a8a692d69fe82194856665219d047a56fa83ee623eaca3e",
        entry.id,name, entry.body, this.currenttime, this.currenttimestamp, this.crycomment));
          this.checkorder();})
       ;})
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