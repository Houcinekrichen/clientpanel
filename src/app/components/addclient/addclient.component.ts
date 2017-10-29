import { Component, OnInit } from '@angular/core';
import { Client} from "../../models/client"
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router'
import {ClientService} from '../../services/client.service'
import {SettingsService} from '../../services/settings.service'

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  client :Client ={

    firstname  : '',
    lastname :'',
    email :'',
    phone : '',
    balance : 0 

  }
  disabledBalanceOnAdd : boolean 

  constructor(
    public flashMessagesService : FlashMessagesService , 
    public router :Router, 
    public clientService : ClientService,
    private settingsServices : SettingsService) 
  { }

  ngOnInit() {
    this.disabledBalanceOnAdd = this.settingsServices.getSettings().disableBalanceAdd
  }

  onSubmit({value,valid}:{value:Client ,valid:boolean}){
   if(this.disabledBalanceOnAdd ){
     value.balance = 0
   }
   if(!valid){
      this.flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['addclient'])
   }else{

      this.clientService.newClient(value)
      this.flashMessagesService.show('New Client added !', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/'])
   }
  }

}
