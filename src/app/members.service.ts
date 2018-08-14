import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MembersService {

  constructor(private http: HttpClient) { }

  // Get all members from the API
  getAllMembers() {
    console.log('in getAllMembers');
    return this.http.get('/api/members');
  }
}