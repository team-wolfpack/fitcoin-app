import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberDetailService {

  constructor(private http: Http) { }

  // Get the member from the API
  getMember() {
    console.log('in getMember');
    /*
    return this.http.get('/api/member-detail/'+id)
      .map(res => res.json());
      */
  }
}
