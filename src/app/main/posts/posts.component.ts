import { Component, Input, OnInit} from '@angular/core';
import { PostsService } from './posts.service';
import { Router } from '@angular/router';
import { FeedInfo } from './feed-info';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { PageEvent } from '@angular/material/paginator';

class CommentInfo {
  constructor(public commentauthor: string, public commentid: string, 
    public commentbody: string, public commenttime: Date) {
    this.commentauthor = commentauthor;
    this.commentid = commentid;
    this.commentbody = commentbody;
    this.commenttime = commenttime;
  }
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  @Input() message : number;
  searchKey = new FormControl('');
  edFeed = new FormControl('');
  edComm = new FormControl('');

  documents: FeedInfo[]=[];
  comms: CommentInfo[]=[];

  feedForm: FormGroup;
  loginuser: string;
  currenttimestamp: any;
  currenttime: any;
  searchText=undefined;
  feedother: any;
  crycomment: any;
  feedimg: string;
  totalRecords: number = 0;
  pageIndex = 0;
  pageSize = 10;

  constructor( private pServ: PostsService,private router:Router,
    private http: HttpClient,private cServ: CookieService) {
      this.feedForm = new FormGroup({ 
      newfeed: new FormControl('',[]),
    }); 
   }

   
  ngOnInit(): void {

    this.pServ.Userarticle('',this.pageIndex+1, this.pageSize, null).subscribe(res=>{
      this.totalRecords = Object.values(res)[1];
      console.log(res)
      if(Object.values(res)[0]){
      Object.values(res)[0].forEach(entry=>{
        this.comms = [];
        this.loginuser = entry.author; 
        if(entry.comments.length==0){
          entry.comments = null
        }
        else{
          for(let i in entry.comments){
            //onsole.log(entry.comments[i])
            this.comms.push(new CommentInfo(entry.comments[i].author, entry.comments[i]._id, 
              entry.comments[i].body, entry.comments[i].date))
          }
        }
        this.documents.push(new FeedInfo(entry.pic,
        entry._id, entry.author, entry.text, new Date(entry.date).toDateString(), Date.parse(entry.date), this.comms));
        this.checkorder()
      
       ;})
       
       
    }})

    

    
  }

  changedate(date){
    return new Date(date).toDateString()
  }


  get newfeed(){
    return this.feedForm.get('newfeed')!;
  }

  resetpost(){
    this.feedForm.reset();
  }

  addfeed(){
    if(this.newfeed.value){
      const fd = new FormData();
      if(this.feedimg){//text and img post
        fd.append('image', this.feedimg);
        fd.append('text', this.newfeed.value);
        this.pServ.Addarticle(fd).subscribe(res=>{
          this.searchfeed();
          this.feedForm.reset();
          this.feedimg = null;
        })
      }
      else{//only textposted
        fd.append('text', this.newfeed.value);
        this.pServ.Addarticle(fd).subscribe(res=>{
          this.searchfeed();
          this.feedForm.reset();
        })
    }}
    return   

  }
  

  searchfeed(){
    this.totalRecords = 0;
    this.pageIndex = 0;
    this.pServ.Userarticle('',this.pageIndex+1, this.pageSize, null).subscribe(res=>{  
      this.documents = [];
      this.totalRecords = Object.values(res)[1];
      Object.values(res)[0].forEach(entry=>{
        this.comms = [];
        this.loginuser = entry.author; 
        if(entry.comments.length==0){
          entry.comments = null
        }
        else{
          for(let i in entry.comments){
            console.log()
            this.comms.push(new CommentInfo(entry.comments[i].author, entry.comments[i]._id, 
              entry.comments[i].body, entry.comments[i].date))
          }
        }
        this.documents.push(new FeedInfo(entry.pic,
        entry._id, entry.author, entry.text, new Date(entry.date).toDateString(), Date.parse(entry.date), this.comms));
        this.checkorder()
        
       ;})})
  }

  searchByName() {
    this.totalRecords = 0;
    this.pageIndex = 0;
    this.pServ.Userarticle('',this.pageIndex+1, this.pageSize, this.searchKey.value).subscribe(res=>{
      this.documents = [];
      this.totalRecords = Object.values(res)[1];
      Object.values(res)[0].forEach(entry=>{
        this.loginuser = entry.author; 
        this.comms = [];
        if(entry.comments.length==0){
          entry.comments = null
        }
        else{
          for(let i in entry.comments){
            console.log()
            this.comms.push(new CommentInfo(entry.comments[i].author, entry.comments[i]._id, 
              entry.comments[i].body, entry.comments[i].date))
          }
        }
        this.documents.push(new FeedInfo(entry.pic,
        entry._id, entry.author, entry.text, new Date(entry.date).toDateString(), Date.parse(entry.date), entry.comments));
        this.checkorder()
       ;})
      })
  }
  
  checkorder(){
    this.documents.sort(function(y, x){
      return x.timestamp - y.timestamp;
  })
  }

  deletefollowfeed(profile){
    this.totalRecords = 0;
    this.pageIndex = 0;
    this.pServ.Userarticle('',this.pageIndex+1, this.pageSize, null).subscribe(res=>{
      this.documents = [];
      this.totalRecords = Object.values(res)[1];
      Object.values(res)[0].forEach(entry=>{
        this.loginuser = entry.author; 
        this.comms = [];
        if(entry.comments.length==0){
          entry.comments = null
        }
        else{
          for(let i in entry.comments){
            console.log()
            this.comms.push(new CommentInfo(entry.comments[i].author, entry.comments[i]._id, 
              entry.comments[i].body, entry.comments[i].date))
          }
        }
        this.documents.push(new FeedInfo(entry.pic,
        entry._id, entry.author, entry.text, new Date(entry.date).toDateString(), Date.parse(entry.date), entry.comments));
        this.checkorder()
       ;})
      })

  }

  editfeed(document){
    this.pServ.editarticle(document.feedid, this.edFeed.value).subscribe(res=>{
      this.edFeed.reset();
      this.searchfeed();
      
    })   
  }


  addcomment(document){
    this.pServ.addcomment(document.feedid, this.edComm.value).subscribe(res=>{
      this.edComm.reset();
      this.searchfeed();
    })
  }

  handleFeedImageChange(e){
    //console.log(e.target.files[0])
    this.feedimg = e.target.files[0]
  }
  
  handlePageEvent(e: PageEvent) {
    this.documents = [];
    this.pageIndex = e.pageIndex ;
    this.pageSize = e.pageSize;
    this.pServ.Userarticle('',this.pageIndex+1, this.pageSize, null).subscribe(res=>{
      Object.values(res)[0].forEach(entry=>{
        this.loginuser = entry.author; 
        this.comms = [];
        if(entry.comments.length==0){
          entry.comments = null
        }
        else{
          for(let i in entry.comments){
            console.log(entry.comments[i])
            this.comms.push(new CommentInfo(entry.comments[i].author, entry.comments[i]._id, 
              entry.comments[i].body, entry.comments[i].date))
          }
        }
        this.documents.push(new FeedInfo(entry.pic,
        entry._id, entry.author, entry.text, new Date(entry.date).toDateString(), Date.parse(entry.date), entry.comments));
        this.checkorder()
       ;})
  })
}

}