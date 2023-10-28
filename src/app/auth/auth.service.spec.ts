import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService, MyData } from './auth.service';
import { inject } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('User: registered should match user info in JSON', (done)=>{
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
    service.getData('Samantha').subscribe(data => {
      expect(data).toEqual(expectedData);
      done()
    });
    const testRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');

  testRequest.flush(expectedData);
  })

  it('User: unregistered should match nothing in JSON', (done)=>{
    const expectedData: MyData[] = []
    service.getData('kay').subscribe(data => {
      expect(data).toEqual(expectedData);
      done()
    });
    const testRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');

  testRequest.flush(expectedData);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
