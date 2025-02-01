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

  /*
  public getData(nameFilter: string = ''): Observable<MyData[]> {
    let apiObserverable = this.http.get<MyData[]>(this.url);

    if (nameFilter != '') {
      apiObserverable = apiObserverable.pipe(map(value => value.filter(data => data.username.indexOf(nameFilter) != -1)));
    }

    return apiObserverable.pipe(catchError(error => of<MyData[]>([])));
  }*/
  
  loginUser(username, userpwd){
    return this.http.post("https://spiningserver-507fe40b9b38.herokuapp.com/login",
    {
        "username": username,
        "password": userpwd,
    },{ withCredentials: true })
  }

  regiUser(username, useremail, userdob, userphone, userzipcode, userpwd){
    return this.http.post("https://spiningserver-507fe40b9b38.herokuapp.com/register",
    {
        "username": username,
        "email": useremail,
        "dob": userdob,
        "phone": userphone,
        "zipcode":userzipcode,
        "password": userpwd,
    },{ withCredentials: true })
  }
}
