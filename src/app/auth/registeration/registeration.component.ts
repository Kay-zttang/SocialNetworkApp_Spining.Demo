import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterationService} from "../registeration/registeration.service";
import {Router} from "@angular/router";
import { PostsService } from 'src/app/main/posts/posts.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit{
    regForm: FormGroup;
    selectuser: any;
    uniqueuser: boolean;

    constructor(private rServ: RegisterationService, private router: Router, 
      private aServ:AuthService, private cServ:CookieService) {
      this.regForm = this.createFormGroup();
      this.uniqueuser = false;
    }

    ngOnInit(): void {
    }

    createFormGroup() {
      return new FormGroup({ 
        name: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-za-z][A-Za-z0-9]+')])),
        dispname: new FormControl(''),
        email: new FormControl('',[
          Validators.required,
          Validators.email]),
        phone: new FormControl('',[
          Validators.required,
          Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')]),
        bday: new FormControl('',[
          Validators.required,
          this.rServ.bdaycheck()]),
        zip: new FormControl('',[
            Validators.required,
            Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]),
        pwd: new FormControl('',[
          Validators.required,
          Validators.minLength(8)]),
        confpwd: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          ])
      },
      this.rServ.passwordMatch('pwd', 'confpwd'));
    }

    get name() { return this.regForm.get('name')!; }
    get dispname() { return this.regForm.get('dispname')!;}
    get email() { return this.regForm.get('email')!;}
    get phone() { return this.regForm.get('phone')!;}
    get bday() { return this.regForm.get('bday')!;}
    get zip() { return this.regForm.get('zip')!;}
    get pwd() { return this.regForm.get('pwd')!;}
    get confpwd() { return this.regForm.get('confpwd')!;}


    onSubmit() {
      this.aServ.getData(this.regForm.value.name).subscribe(data =>{
        this.selectuser = data;
        console.log(this.selectuser);
        this.check();
        console.log(this.uniqueuser);
       });
      
    }

    onReset() {
      this.regForm.reset();
  }

  check(){
    if(this.selectuser.length != 1){
      this.cServ.set('maincookie', JSON.stringify(this.regForm.value))
      this.regForm.reset();
      this.router.navigate(['/main']);
      }
    else{
      this.uniqueuser = true;
      this.regForm.reset();
    }
  }
}

