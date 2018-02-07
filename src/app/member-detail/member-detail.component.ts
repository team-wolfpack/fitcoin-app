import { Component, Input, OnInit } from '@angular/core';
import { MemberDetailService } from '../member-detail.service';
import { Http, Response } from '@angular/http';

//import * as $ from 'jquery';

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
	
	private apiBaseURL="http://184.172.234.29:31090/api/";
	fitCoinBalance: number = 0;
	inactivateMemberButton = 'disabled';
	private stores: any = []; 
	private store: string;
	private redeemedFor: string;
	private fitCoinsToRedeem: number;
	
	constructor (private http: Http) {
		//console.log(this.apiURL);	
	}

	getFitCoinBalance(personId) {
		//console.log(this.apiURL);
		var data;
		var apiURL = this.apiBaseURL+"FitCoinWallet/"+personId
		try {
			data = this.http.get(apiURL)
			.map((res: Response) => res.json());
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
					console.log(res);
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

		var yyyy = today.getFullYear().toString();
		if(dd<10){
		    var ddString='0'+dd.toString();
		} 
		if(mm<10){
		    var mmString='0'+mm.toString();
		} 
		var todayFormatted = yyyy+'-'+mmString+'-'+ddString;		
		var data = { member: this.personId,
				activity: "Checked In",
				activityDate: todayFormatted,
				fitCoinQuantity: fitCoinsToAdd };
		console.log(data);
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
