import { Injectable, Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
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


  public fData(idFilter: number = 0): Observable<Myfeed[]> {
    let apiObserverable = this.http.get<Myfeed[]>('https://jsonplaceholder.typicode.com/posts');

    if (idFilter != 0) {
      apiObserverable = apiObserverable.pipe(map(value => value.filter(o => o.userId == idFilter)));
    }

    return apiObserverable.pipe(catchError(error => of<Myfeed[]>([])));
  };

  public uData(idFilter: number = 0): Observable<Myfo[]> {
    let apiObserverable = this.http.get<Myfo[]>('https://jsonplaceholder.typicode.com/users');

    if (idFilter != 0) {
      apiObserverable = apiObserverable.pipe(map(value => value.filter(o => o.id == idFilter)));
    }

    return apiObserverable;
  };

  public unData(nameFilter: String=''): Observable<Myfo[]> {
    let apiObserverable = this.http.get<Myfo[]>('https://jsonplaceholder.typicode.com/users');

    if (nameFilter != '') {
      apiObserverable = apiObserverable.pipe(map(value => value.filter(o => o.name == nameFilter)));
    }

    return apiObserverable;
  };

  public commentData(idFilter: number = 0): Observable<MyComment[]> {
    let apiObserverable = this.http.get<MyComment[]>('https://jsonplaceholder.typicode.com/comments');

    if (idFilter != 0) {
      apiObserverable = apiObserverable.pipe(map(value => value.filter(o => o.postId == idFilter)));
    }

    return apiObserverable;
  };
}

