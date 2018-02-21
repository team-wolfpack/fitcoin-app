import { Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  //instantiate the members
  members: any = [];
  private apiBaseURL=environment.apiBaseURL;
  private clubId: string;
  private clubName: string;
  private clubOwnerId: string;
  private clubOwnerFirstName: string;
  private clubOwnerLastName: string;
  private memberFirstName: string;
  private memberLastName: string;
  private redeemFitCoinsShow: boolean=false;
  private memberHistoryShow: boolean=false;
  private personId: string;
  
  constructor(private http: Http) { }

  showMemberActivityHistoryMessage($event) {
	  console.log('received a show member history event');
	  console.log($event);
	  this.memberHistoryShow = true;
	  this.personId = $event;
  }
  
  redeemFitCoinsMessage($event) {
	  this.redeemFitCoinsShow = true;
	  this.personId = $event;
  }
  
  closeRedeemFitCoinsFormMessage($event) {
	  this.redeemFitCoinsShow = false;
	  this.getAllMembers();
  }
  
  getClub() {
		var data;
		var apiURL = this.apiBaseURL+"Club/CLUB_001";
		try {
			data = this.http.get(apiURL).map((res: Response) => res.json());
		} catch (err) {
			console.log ('Error: ' + err);
		}
		return data;
  }
  
  getClubOwner() {
		var data;
		var apiURL = this.apiBaseURL + "ClubOwner/" + this.clubOwnerId;
		try {
			data = this.http.get(apiURL)
			.map((res: Response) => res.json());
		} catch (err) {
			console.log ('Error: ' + err);
		}
		return data;
	  
  }
  
  getClubData() {
	this.getClub().subscribe (data => {
		this.clubId = data.clubId;
		this.clubName = data.clubName;
		this.clubOwnerId = data.clubOwner.split('#')[1];
		//this.clubOwnerId = data.clubOwner.personId;
		this.getClubOwner().subscribe(data => {
			this.clubOwnerFirstName = data.personFirstName;
			this.clubOwnerLastName = data.personLastName;			
		});
	});
  }
  
  getAllMembers() {
	  var data;
	  var apiURL = this.apiBaseURL + "queries/ActiveMembers";
	  try {
		  this.http.get(apiURL)
		  .map((res: Response) => res.json()).subscribe(data => {
			  this.members = data;
		  });
	  } catch (err) {
		  console.log('Error: ' + err);
	  }
  }
  
  ngOnInit() {
    // retrieve all Members from API
	this.getClubData();
	this.getAllMembers();
  }

  addNewMember() {
//	  this.addMemberRef = this.dialog.open(AddMemberComponent);
	  var apiURL = this.apiBaseURL+"AddMember";
	  var memberId = "MEMBER_" + Math.floor(Math.random()*2000000).toString();
	  var data = { memberId: memberId,
				memberFirstName: this.memberFirstName,
				memberLastName: this.memberLastName,
				club: this.clubId };
		this.http.post(apiURL,data)
			.subscribe(res => {
					this.getAllMembers();
				},err => {
					console.log("Error Occurred" + err);
				}
		);

  }


}