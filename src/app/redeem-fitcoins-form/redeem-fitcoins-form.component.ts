import { Component, Input, OnInit } from '@angular/core';
import { MemberDetailService } from '../member-detail.service';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-redeem-fitcoins-form',
  templateUrl: './redeem-fitcoins-form.component.html',
  styleUrls: ['./redeem-fitcoins-form.component.css']
})
export class RedeemFitcoinsFormComponent implements OnInit {
	@Input() personId:string;

  constructor(private http: Http) { }

  private apiBaseURL="http://184.172.234.29:31090/api/";
  private stores: any = []; 
  private store: string;
  private redeemedFor: string;
  private fitCoinsToRedeem: number;
  private fitCoinBalance: number = 0;

	getStores() {
		console.log('getStores()');
		var data;
		var apiURL = this.apiBaseURL+"StoreOwner"
		try {
			this.http.get(apiURL)
			.map((res: Response) => res.json()).subscribe(data => {
				this.stores = data;
				console.log('number of stores: ' + this.stores.length);
				console.log(this.stores);
			});
		} catch (err) {
			console.log ('Error: ' + err);
		}
		
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
    this.getStores();
  }
	
  redeemFitCoins(personId) {
	console.log('redeemFitCoins()');
	var apiURL = this.apiBaseURL+"RedeemFitCoins";
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
			storeOwner: this.store,
			redeemedFor: this.redeemedFor,
			redeemedDate: todayFormatted,
			fitCoinQuantity: Number(this.fitCoinsToRedeem) };
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
