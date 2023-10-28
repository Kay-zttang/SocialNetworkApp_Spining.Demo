import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { AuthComponent } from './auth.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { AuthService, MyData } from './auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let service: AuthService;
  let mockValidator: jasmine.SpyObj<AuthService>;
  
  const fakeActivatedRoute = {
    snapshot: {
      queryParams: {
        returnUrl: '/'
      }
    }
  };
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent, RegisterationComponent],
      imports: [HttpClientModule,ReactiveFormsModule,FormsModule, HttpClientTestingModule],
      providers: [{provide: AuthService,useValue: jasmine.createSpyObj('AuthService', ['getData'])},
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() =>{
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    service = TestBed.inject(AuthService)
    mockValidator = TestBed.get(AuthService);
    
  })

  it('Check a Form group element count', ()=>{
    const formElement = fixture.debugElement.nativeElement.querySelector('#loginForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(3)
  })

  it('Check initial form values for login form', () => {
    const loginFormGroup = component.loginForm;
    const loginFormValues ={
      username:'',
      pwd:''
    }
    expect(loginFormGroup.value).toEqual(loginFormValues)
  });

  it('Check value:username after entering the value in HTML element', (done)=>{
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
    loginFormUserElement.value = 'kay';
    loginFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const userNameValueFormGrp = component.loginForm.get('username');
      expect(loginFormUserElement.value).toEqual(userNameValueFormGrp.value);
      expect(userNameValueFormGrp.errors).toBeNull();
      done();
    })
  });

  it('Check value:pwd after entering the value in HTML element', (done)=>{
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[1];
    loginFormUserElement.value = '12345678';
    loginFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const userNameValueFormGrp = component.loginForm.get('pwd');
      expect(loginFormUserElement.value).toEqual(userNameValueFormGrp.value);
      expect(userNameValueFormGrp.errors).toBeNull();
      done();
    })
  });

  it('Validate: Check to log in a previously registered user (login stat = checkusers)', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("Samantha");
    component.loginForm.controls['pwd'].setValue("Douglas Extension");
    expect(component.loginForm.valid).toBeTruthy();

    const expectedData: MyData[] = [
      {"id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
            "lat": "-68.6102",
            "lng": "-47.0653"
        }
    },
      }];
    mockValidator.getData.and.returnValue(of(expectedData));
    component.onLogin()
    expect(component.checkuser).toBeTrue()
  });

  it('Validate: Check to not log in an invalid user (pwd error stat = warningpwd)', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("Samantha");
    component.loginForm.controls['pwd'].setValue("12345678");
    expect(component.loginForm.valid).toBeTruthy();

    const expectedData: MyData[] = [
      {"id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
            "lat": "-68.6102",
            "lng": "-47.0653"
        }
    },
      }];
    mockValidator.getData.and.returnValue(of(expectedData));
    component.onLogin()
    expect(component.warningpwd).toBeTrue()
  });

  it('Validate: Check to not log in an invalid user (username error stat = warningname)', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("kay");
    component.loginForm.controls['pwd'].setValue("12345678");
    expect(component.loginForm.valid).toBeTruthy();

    const expectedData: MyData[] = [];
    mockValidator.getData.and.returnValue(of(expectedData));
    component.onLogin()
    expect(component.warningname).toBeTrue()
  });

  it('Validate: Check Logout (since main navigate back and clear all cookies, login stat should restore to false)', ()=>{
    expect(component.checkuser).toBeFalse();
  })
});