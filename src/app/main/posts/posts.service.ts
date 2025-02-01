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
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/logout",{},{ withCredentials: true })
  }

  Userstatus(name: string = ''){
      return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/headline/"+name,{  withCredentials: true});
  }

  Useravatar(name: string = ''){
      return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/avatar/"+name,{ withCredentials: true});
  }

  Newstatus(status){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/headline",
    {"headline": status},{ withCredentials: true })
  }

  Userfollwing(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/following/",{ withCredentials: true })
  }

  Newfollowing(name){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/following/"+name,{},{ withCredentials: true })
  }

  Deletefollowing(name){
    return this.http.delete("https://spiningserver-507fe40b9b38.herokuapp.com/following/"+name,{ withCredentials: true })
  }


  Userarticle(id:string = '', currentPage, pageSize, searchkey){
    if(searchkey == null){
      return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/articles/"+id+"?page="+currentPage+"&limit="+pageSize+"&q=",{ withCredentials: true});
    }
    else{
      return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/articles/"+id+"?page="+currentPage+"&limit="+pageSize+"&q="+searchkey,{ withCredentials: true});
    }
    
  }

  Addarticle(fd){
      return this.http.post("https://spiningserver-507fe40b9b38.herokuapp.com/article",
      fd,{ withCredentials: true })
  }

  editarticle(id, editmsg){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/articles/"+id,{text:editmsg},{ withCredentials: true })
  }

  addcomment(id, editmsg){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/articles/"+id,{text:editmsg, commentId:-1},{ withCredentials: true })
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

