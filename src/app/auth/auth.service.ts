import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface MyData {
  id: any;
  name: string;
  username:string;
  address: object;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  getUsers() {
    const req = new HttpRequest('GET', this.url, {
      reportProgress: true
    });
    return this.http.request(req)
  }

  public getData(nameFilter: string = ''): Observable<MyData[]> {
    let apiObserverable = this.http.get<MyData[]>(this.url);

    if (nameFilter != '') {
      apiObserverable = apiObserverable.pipe(map(value => value.filter(data => data.username.indexOf(nameFilter) != -1)));
    }

    return apiObserverable.pipe(catchError(error => of<MyData[]>([])));
  }
  
}