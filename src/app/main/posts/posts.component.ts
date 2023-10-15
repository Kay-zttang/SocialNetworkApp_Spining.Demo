import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Router } from '@angular/router';
import { FeedInfo } from './feed-info';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  @Input() message : number;
  documents: FeedInfo[]=[];
  feedForm: FormGroup;
  feedid: any;
  feedauthor: string;
  feedtext: string;
  currenttimestamp: any;
  currenttime: any;
  searchText=undefined;
       
  constructor( private tServ:PostsService,private router:Router,
    private http: HttpClient,private cServ: CookieService) {
      this.feedForm = new FormGroup({ 
      newfeed: new FormControl('',[]),
    });
    
    this.feedid = JSON.parse(this.cServ.get('maincookie'));
    this.searchfeed(this.feedid.id, this.feedid.name);
    
  
   }

   
  ngOnInit(): void {
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
      this.documents.push(new FeedInfo("https://img.freepik.com/free-vector/like-icon-3d-vector-illustration-heart-symbol-red-bubble-social-media-applications-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1695.jpg?w=2000&t=st=1697266355~exp=1697266955~hmac=10afedcd5d406fd57a8a692d69fe82194856665219d047a56fa83ee623eaca3e",
      this.feedid.name, this.newfeed.value, this.currenttime, this.currenttimestamp));
      this.checkorder();
      this.feedForm.reset();
    }
    return   
  }

  searchfeed(id: number, name:string){
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(response =>{
      let array = Object.values(response);
      let indarr = array.filter(o => o.userId == id );
      indarr.forEach(entry=>{
        this.currenttimestamp = new Date().getTime() ;
        this.currenttime = new Date().toLocaleString();
        this.documents.push(new FeedInfo("https://img.freepik.com/free-vector/like-icon-3d-vector-illustration-heart-symbol-red-bubble-social-media-applications-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1695.jpg?w=2000&t=st=1697266355~exp=1697266955~hmac=10afedcd5d406fd57a8a692d69fe82194856665219d047a56fa83ee623eaca3e",
      name, entry.body, this.currenttime, this.currenttimestamp))}
      );     
  })
  }

  
  checkorder(){
    this.documents.sort(function(y, x){
      return x.timestamp - y.timestamp;
  })
  }
}