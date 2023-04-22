import { Injectable } from '@angular/core';
import { Requirement } from './requirement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {

  constructor(private httpClient: HttpClient) {
  }

  getRequirements(): Observable<Requirement[]> {
    const url = 'http://localhost:3000/requirements';
    return this.httpClient.get<Requirement[]>(url);
    // return [
    //   { id: 2000, title: 'USB wire', contactMobileNo: '0891234567' },
    //   { id: 2001, title: 'USB A', contactMobileNo: '0991234567' },
    //   { id: 2002, title: 'USB C', contactMobileNo: '0881234567' },
    // ];
  }
}
