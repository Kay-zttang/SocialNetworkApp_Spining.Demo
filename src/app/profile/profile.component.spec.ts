import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { CookieService } from 'ngx-cookie-service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  class CookieServiceStub{
    get(name: string) {
      let val = '{"id":3,"name":"Clementine Bauch","username":"Samantha","email":"Nathan@yesenia.net","address":{"street":"Douglas Extension","suite":"Suite 847","city":"McKenziehaven","zipcode":"59590-4157","geo":{"lat":"-68.6102","lng":"-47.0653"}},"phone":"1-463-123-4447","website":"ramiro.info","company":{"name":"Romaguera-Jacobson","catchPhrase":"Face to face bifurcated interface","bs":"e-enable strategic applications"}}'
      return val
    }
    deleteAll(){    
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule],
      providers:[{ provide: CookieService, useClass: CookieServiceStub}]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check to fetch Login User username', () => {
    expect(component.checkusername).toEqual('Samantha')
  })

  it('UpdateForm: update new value to profile', () => {
    const loginFormUserElement1: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#updateForm').querySelectorAll('input')[0];
    const loginFormUserElement2: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#updateForm').querySelectorAll('input')[1];
    const loginFormUserElement3: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#updateForm').querySelectorAll('input')[2];
    const loginFormUserElement4: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#updateForm').querySelectorAll('input')[3];
    const loginFormUserElement5: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#updateForm').querySelectorAll('input')[4];
    loginFormUserElement1.value = 'Leanne Graham';
    loginFormUserElement2.value = 'Sincere@april.biz';
    loginFormUserElement3.value = '123-123-1234';
    loginFormUserElement4.value = '92998';
    loginFormUserElement5.value = '123456789';
    loginFormUserElement1.dispatchEvent(new Event('input'));
    loginFormUserElement2.dispatchEvent(new Event('input'));
    loginFormUserElement3.dispatchEvent(new Event('input'));
    loginFormUserElement4.dispatchEvent(new Event('input'));
    loginFormUserElement5.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.updatenm.value).toEqual('Leanne Graham');

    component.toUpdate();
    fixture.detectChanges();
    expect(component.usernm).toEqual('Leanne Graham');
    expect(component.useremail).toEqual('Sincere@april.biz');
    expect(component.usertel).toEqual('123-123-1234');
    expect(component.userzip).toEqual('92998');
    expect(component.userpwd).toEqual('123456789');
  });
});
