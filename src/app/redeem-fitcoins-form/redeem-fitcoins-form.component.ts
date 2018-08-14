import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-redeem-fitcoins-form',
  templateUrl: './redeem-fitcoins-form.component.html',
  styleUrls: ['./redeem-fitcoins-form.component.css']
})
export class RedeemFitcoinsFormComponent implements OnChanges, OnInit {
	@Input() personId:string;
	@Input() redeemFitCoinsShow:boolean;
	
	@Output() closeRedeemFitCoinsFormEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  private apiBaseURL=environment.apiBaseURL;
  private stores: any = []; 
  private store: string;
  private redeemedFor: string;
  private fitCoinsToRedeem: number;
  private fitCoinBalance: number = 0;
  private _redeemFitCoinsShow: boolean;
 
	getStores() {
		var data;
		var apiURL = this.apiBaseURL+"StoreOwner"
		try {
			this.http.get(apiURL).subscribe(data => {
				this.stores = data;
			});
		} catch (err) {
			console.log ('Error: ' + err);
		}
		
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
	
  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {
    this.getStores();
  }
	
  closeForm() {
	  this.closeRedeemFitCoinsFormEvent.emit(false);
  }
 
  redeemFitCoins(personId) {	
	var apiURL = this.apiBaseURL+"RedeemFitCoins";
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
			storeOwner: this.store,
			redeemedFor: this.redeemedFor,
			redeemedDate: todayFormatted,
			fitCoinQuantity: Number(this.fitCoinsToRedeem) };
	this.http.post(apiURL,data)
		.subscribe(res => {
				this.getFitCoinBalance(this.personId).subscribe(data => {
					this.fitCoinBalance = Number(data.fitCoinBalance);
				}, error => {
					this.fitCoinBalance = 0;
				});
				this.closeRedeemFitCoinsFormEvent.emit(false);
			},err => {
				console.log("Error Occurred" + err);
			}
      );
	}

}
