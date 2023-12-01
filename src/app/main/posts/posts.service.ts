import { Injectable, Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Myfeed {
  userId: any;
  id: any;
  title:string;
  body: string;
}

export interface Myfo {
  id: any;
  name: string;
  username:string;
  address: object;
  company:object;
}

export interface MyComment {
  postId: any;
  id: any;
  name:string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
   
  constructor(private http: HttpClient
  ) { }

  logoutUser(){
    return this.http.put("http://localhost:3000/logout",{},{ withCredentials: true })
  }

  Userstatus(name: string = ''){
      return this.http.get("http://localhost:3000/headline/"+name,{  withCredentials: true});
  }

  Useravatar(name: string = ''){
      return this.http.get("http://localhost:3000/avatar/"+name,{ withCredentials: true});
  }

  Newstatus(status){
    return this.http.put("http://localhost:3000/headline",
    {"headline": status},{ withCredentials: true })
  }

  Userfollwing(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("http://localhost:3000/following/",{ withCredentials: true })
  }

  Newfollowing(name){
    return this.http.put("http://localhost:3000/following/"+name,{},{ withCredentials: true })
  }

  Deletefollowing(name){
    return this.http.delete("http://localhost:3000/following/"+name,{ withCredentials: true })
  }


  Userarticle(id:string = '', currentPage, pageSize, searchkey){
    if(searchkey == null){
      return this.http.get("http://localhost:3000/articles/"+id+"?page="+currentPage+"&limit="+pageSize+"&q=",{ withCredentials: true});
    }
    else{
      return this.http.get("http://localhost:3000/articles/"+id+"?page="+currentPage+"&limit="+pageSize+"&q="+searchkey,{ withCredentials: true});
    }
    
  }

  Addarticle(fd){
      return this.http.post("http://localhost:3000/article",
      fd,{ withCredentials: true })
  }
  /////////////////////////////////////////////////////////////////


  public commentData(idFilter: number = 0): Observable<MyComment[]> {
    let apiObserverable = this.http.get<MyComment[]>('https://jsonplaceholder.typicode.com/comments');

    if (idFilter != 0) {
      apiObserverable = apiObserverable.pipe(map(value => value.filter(o => o.postId == idFilter)));
    }

    return apiObserverable;
  };
}

