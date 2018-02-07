import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MembersService {

  constructor(private http: Http) { }

  // Get all members from the API
  getAllMembers() {
    console.log('in getAllMembers');
    return this.http.get('/api/members')
      .map(res => res.json());
  }
}