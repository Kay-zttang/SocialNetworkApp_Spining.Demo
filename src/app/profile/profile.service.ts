import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest,HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  Useremail(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("http://localhost:3000/email/",{ withCredentials: true })
  }

  Userphone(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("http://localhost:3000/phone/",{ withCredentials: true })
  }

  Userzipcode(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("http://localhost:3000/zipcode/",{ withCredentials: true })
  }

  NewEmail(email){
    return this.http.put("http://localhost:3000/email",
    {"email": email},{ withCredentials: true })
  }

  NewPhone(phone){
    return this.http.put("http://localhost:3000/phone",
    {"phone": phone},{ withCredentials: true })
  }

  NewZipcode(zipcode){
    return this.http.put("http://localhost:3000/zipcode",
    {"zipcode": zipcode},{ withCredentials: true })
  }

  NewPwd(pwd){
    return this.http.put("http://localhost:3000/password",
    {"password": pwd},{ withCredentials: true })
  }


}
