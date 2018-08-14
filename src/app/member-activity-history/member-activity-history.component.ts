import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Response } from '@angular/http';
//import { DatePipe, SlicePipe } from '@angular/common';
//import { map } from 'rxjs/add/operators';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-member-activity-history',
  templateUrl: './member-activity-history.component.html',
  styleUrls: ['./member-activity-history.component.css']
})
export class MemberActivityHistoryComponent implements OnChanges, OnInit {
  @Input() personId:string;
  @Input() memberHistoryShow:boolean;
  
  activityHistory: any = [];
  
  private apiBaseURL=environment.apiBaseURL;

  constructor(private http: HttpClient) { }
  
  getFitCoinsReceived(personId) {
	  var data;
	  var apiURL = this.apiBaseURL + "queries/FindFitCoinsReceivedByMember?member=resource%3Aorg.fitclub.fitcoin.Member%23" + personId;
	  try {
		  this.http.get(apiURL).subscribe(data => {
			  this.activityHistory=data;
			  this.getFitCoinsRedeemed(personId);
		  });
	  } catch (err) {
		  console.log('Error: ' + err);
	  }	  
  }
  
  getFitCoinsRedeemed(personId) {
	  var data;
	  var apiURL = this.apiBaseURL + "queries/FindFitCoinRedemptionsByMember?member=resource%3Aorg.fitclub.fitcoin.Member%23" + personId;
	  try {
		  this.http.get(apiURL)
		  .subscribe(data => {
			  var received = this.activityHistory;
			  var redeemed = data;
			  this.activityHistory = received.concat(redeemed);
			  this.activityHistory.sort(function(a,b) {
				  var value1 = a.transactionDate;
				  var value2 = b.transactionDate;
				  if (value1 < value2) { 
					  return -1;
				  } else if (value2 > value1) {
					  return 1;
				  } else {
					  return 0;
				  }
			  });
			  console.log('activity history');
			  console.log(this.activityHistory);
		  });
	  } catch (err) {
		  console.log('Error: ' + err);
	  }	  	  
  }
  
  getActivityHistory(personId) {
	this.activityHistory = [];
	this.getFitCoinsReceived(personId);
  }
  
  ngOnChanges(changes: SimpleChanges) {
	  this.personId = changes["personId"].currentValue;
	  this.getActivityHistory(this.personId);
  }
  
  ngOnInit() {
	  //this.getActivityHistory(this.personId);
  }

}
