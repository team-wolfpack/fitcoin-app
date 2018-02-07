import { Component, Input, OnInit } from '@angular/core';
import { MembersService } from '../members.service';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
//import { MatDialog, MatDialogRef } from '@angular/material';
//import { AddMemberComponent } from '../add-member';



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  //instantiate the members
  members: any = [];
  private apiBaseURL="http://184.172.234.29:31090/api/";
  private clubId: string;
  private clubName: string;
  private clubOwnerId: string;
  private clubOwnerFirstName: string;
  private clubOwnerLastName: string;
  private memberFirstName: string;
  private memberLastName: string;
  
//  addMemberRef: MatDialogRef<AddMemberComponent>;

  
  constructor(private membersService: MembersService, private http: Http) { }

  getClubData() {
	var data;
	var apiURL = this.apiBaseURL+"Club/CLUB_001"
	try {
		this.http.get(apiURL)
		.map((res: Response) => res.json()).subscribe(data => {
			console.log('got club');
			console.log('data = ' + data);
			this.clubId = data.clubId;
			this.clubName = data.clubName;
			this.clubOwnerId = data.clubOwner.split('#')[1];
			console.log('club owner id= ' + this.clubOwnerId);
			apiURL = this.apiBaseURL + "ClubOwner/" + this.clubOwnerId;
			console.log(apiURL);
			this.http.get(apiURL)
			.map((res: Response) => res.json()).subscribe(data => {
				console.log(data);
				this.clubOwnerFirstName = data.personFirstName;
				this.clubOwnerLastName = data.personLastName;
			});
		});
	} catch (err) {
		console.log ('Error: ' + err);
	}
  }
  
  ngOnInit() {
    // retrieve all Members from API
	this.getClubData();
    this.membersService.getAllMembers().subscribe(members => {
      this.members = members;
    });
  }

  addNewMember() {
//	  this.addMemberRef = this.dialog.open(AddMemberComponent);
	  console.log('addNewMember()');
	  console.log('Member First Name ' + this.memberFirstName);
	  console.log('Member Last Name ' + this.memberLastName);
	  console.log(this.clubId);
	  var apiURL = this.apiBaseURL+"AddMember";
	  var memberId = "MEMBER_" + Math.floor(Math.random()*2000000).toString();
	  var data = { memberId: memberId,
				memberFirstName: this.memberFirstName,
				memberLastName: this.memberLastName,
				club: this.clubId };
		console.log(data);
		this.http.post(apiURL,data)
			.subscribe(res => {
					this.membersService.getAllMembers().subscribe(members => {
						this.members = members;
				    });
				},err => {
					console.log("Error Occurred" + err);
				}
		);

  }


}