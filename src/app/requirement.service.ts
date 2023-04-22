import { Injectable } from '@angular/core';
import { Requirement } from './requirement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {

  readonly url = 'http://localhost:3000/requirements';

  constructor(private httpClient: HttpClient) {
  }

  getRequirements(): Observable<Requirement[]> {

    return this.httpClient.get<Requirement[]>(this.url);
    // return [
    //   { id: 2000, title: 'USB wire', contactMobileNo: '0891234567' },
    //   { id: 2001, title: 'USB A', contactMobileNo: '0991234567' },
    //   { id: 2002, title: 'USB C', contactMobileNo: '0881234567' },
    // ];
  }

  getRequirement(id: number): Observable<Requirement> {
    return this.httpClient.get<Requirement>(`${this.url}/${id}`);
  }

  addRequirement(newRequirement: Requirement): Observable<Requirement> {
    return this.httpClient.post<Requirement>(this.url, newRequirement);
  }

  deleteRequirement(id: number): Observable<void> {
    // localhost:3000/requirements/1010
    return this.httpClient.delete<void>(`${this.url}/${id}`)
    // return this.httpClient.delete<void>(this.url +'/'+ id)
  }

}
