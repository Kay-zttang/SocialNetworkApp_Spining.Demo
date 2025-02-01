import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  Useremail(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/email/",{ withCredentials: true })
  }

  Useravatar(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/avatar/",{ withCredentials: true })
  }

  Userphone(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/phone/",{ withCredentials: true })
  }

  Userzipcode(){
    //const params = new HttpParams().set('user', username);
    return this.http.get("https://spiningserver-507fe40b9b38.herokuapp.com/zipcode/",{ withCredentials: true })
  }

  NewEmail(email){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/email",
    {"email": email},{ withCredentials: true })
  }

  NewPhone(phone){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/phone",
    {"phone": phone},{ withCredentials: true })
  }

  NewZipcode(zipcode){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/zipcode",
    {"zipcode": zipcode},{ withCredentials: true })
  }

  NewPwd(pwd){
    return this.http.put("https://spiningserver-507fe40b9b38.herokuapp.com/password",
    {"password": pwd},{ withCredentials: true })
  }


}
