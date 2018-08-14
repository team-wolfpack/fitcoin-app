import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//import { MemberDetailService } from '../member-detail.service';
import { HttpClient } from '@angular/common/http';
//import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
	  //instantiate the members
	  member: any = [];
	 // constructor(private memberDetailService: MemberDetailService) { }
	@Input() personId:string;
	@Input() memberStatus:string;
	
	@Output() redeemFitCoinsEvent = new EventEmitter<string>();
	@Output() showMemberActivityHistoryEvent = new EventEmitter<string>();
	
	private apiBaseURL=environment.apiBaseURL;
	fitCoinBalance: number = 0;
	inactivateMemberButton = 'disabled';
	private stores: any = []; 
	private store: string;
	private redeemedFor: string;
	private fitCoinsToRedeem: number;
//	private redeemFitCoinsShow: boolean;
	
	constructor (private http: HttpClient) {

	}

	redeemFitCoins(personId) {
		this.redeemFitCoinsEvent.emit(personId);
	}

	showMemberActivityHistory(personId) {
		this.showMemberActivityHistoryEvent.emit(personId);
	}
	
	getFitCoinBalance(personId) {
		var data;
		var apiURL = this.apiBaseURL+"FitCoinWallet/"+personId
		try {
			data = this.http.get(apiURL);
		} catch (err) {
			console.log ('Error: ' + err);
			data = {
				"fitCoinBalance":0
			};
		}
		return data;
	}
		
	ngOnInit() {
		this.getFitCoinBalance(this.personId).subscribe(data => {
			this.fitCoinBalance = Number(data.fitCoinBalance);
		}, error => {
			this.fitCoinBalance = 0;
		});
	
		if (this.memberStatus === 'INACTIVE') {
			this.inactivateMemberButton = 'disabled'
		} else {
			this.inactivateMemberButton = 'enabled'
		};
	}
	
	inactivateMember(personId) {
		var apiURL = this.apiBaseURL+"InactivateMember";
		var data = { member: this.personId };
		this.http.post(apiURL,data)
			.subscribe(res => {
					this.inactivateMemberButton = 'disabled';
					this.memberStatus = 'INACTIVE';
				},err => {
					console.log("Error Occurred" + err);
				}
		);
		this.ngOnInit();
	}
	
	addFitCoins (personId,fitCoinsToAdd) {
		var apiURL = this.apiBaseURL+"ReceiveFitCoins";
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var ddString = dd.toString();
		var mmString = mm.toString();
		
		var yyyy = today.getFullYear().toString();
		if(dd<10){
		    ddString='0'+dd.toString();
		} 
		if(mm<10){
		    mmString='0'+mm.toString();
		}
		var todayFormatted = yyyy+'-'+mmString+'-'+ddString;		
		var data = { member: this.personId,
				activity: "Checked In",
				activityDate: todayFormatted,
				fitCoinQuantity: fitCoinsToAdd };
		this.http.post(apiURL,data)
			.subscribe(res => {
					this.getFitCoinBalance(this.personId).subscribe(data => {
						this.fitCoinBalance = Number(data.fitCoinBalance);
					}, error => {
						this.fitCoinBalance = 0;
					});
				},err => {
					console.log("Error Occurred" + err);
				}
		);
	}
	
}
