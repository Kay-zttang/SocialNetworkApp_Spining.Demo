import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';
import { RegisterationComponent } from './registeration.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AuthService, MyData } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('RegisterationComponent', () => {
  let component: RegisterationComponent;
  let fixture: ComponentFixture<RegisterationComponent>;
  let httpTestingController: HttpTestingController;
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
      declarations: [RegisterationComponent],
      imports: [HttpClientModule,ReactiveFormsModule,FormsModule, HttpClientTestingModule],
      providers: [{provide: AuthService,useValue: jasmine.createSpyObj('AuthService', ['getData'])},
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useFactory: () => fakeActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() =>{
    fixture = TestBed.createComponent(RegisterationComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    service = TestBed.inject(AuthService)
    mockValidator = TestBed.get(AuthService);
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RegiForm: Check Reset()', ()=>{
    const loginFormUserElement1: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#regForm').querySelectorAll('input')[0];
    loginFormUserElement1.value = 'Leanne Graham';
    loginFormUserElement1.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.name.value).toEqual('Leanne Graham');
    component.onReset();
    fixture.detectChanges();
    expect(component.name.value).toBeNull();
  })

  it('RegiForm: Check warning msg if username has been used', ()=>{
    mockValidator.getData.and.returnValue(of(expectedData));
    component.onSubmit();
    expect(component.selectuser).toEqual(expectedData);
    expect(component.uniqueuser).toBeTrue();
  })

  it('RegiForm: Check if username hasnot been used', ()=>{
    mockValidator.getData.and.returnValue(of(expectedDatanull));
    component.onSubmit();
    expect(component.selectuser).toEqual([]);
    expect(component.uniqueuser).not.toBeTrue();
  })

it('RegiForm: Check all value updated and validations', () => {
  const loginFormUserElement1: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#regForm').querySelectorAll('input')[0];
  const loginFormUserElement3: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#regForm').querySelectorAll('input')[2];
  const loginFormUserElement4: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#regForm').querySelectorAll('input')[3];
  const loginFormUserElement5: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#regForm').querySelectorAll('input')[4];
  const loginFormUserElement6: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#regForm').querySelectorAll('input')[6];
  const loginFormUserElement7: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#regForm').querySelectorAll('input')[7];
  loginFormUserElement1.value = 'Leanne Graham';
  loginFormUserElement1.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  loginFormUserElement3.value = 'Sincere@april.biz';
  loginFormUserElement3.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  loginFormUserElement4.value = '123-123-1234';
  loginFormUserElement4.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  loginFormUserElement5.value = '1998-09-01';
  loginFormUserElement5.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  loginFormUserElement6.value = '123456789';
  loginFormUserElement6.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  loginFormUserElement7.value = '123456789';
  loginFormUserElement7.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  expect(component.name.value).toEqual('Leanne Graham');
  expect(component.email.value).toEqual('Sincere@april.biz');
  expect(component.phone.value).toEqual('123-123-1234');
  expect(component.bday.value).toEqual('1998-09-01');
  expect(component.confpwd.errors).toBeNull();
  // Wrong branch check
  loginFormUserElement5.value = '2023-05-01';
  loginFormUserElement5.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  expect(component.bday.errors).toEqual({ invaliddate: true });
  loginFormUserElement6.value = '123456789';
  loginFormUserElement6.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  loginFormUserElement7.value = '987654321';
  loginFormUserElement7.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  expect(component.confpwd.errors).toEqual({ passwordMismatch: true });
});


const expectedDatanull: MyData[] = []

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
  }
]
});
