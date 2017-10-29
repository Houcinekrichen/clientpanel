import { Component, OnInit } from '@angular/core';

import {ClientService} from '../../services/client.service'
import {FlashMessagesService} from "angular2-flash-messages"
import {Router,ActivatedRoute,Params} from "@angular/router"
import {Client } from "../../models/client"
import {SettingsService} from '../../services/settings.service'


@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {
  id : string ; 
  client : Client ={

    firstname : '',
    lastname : '',
    email : '',
    phone :'',
    balance : 0 


  }
  disableBalanceOnEdit : boolean  

  constructor(
    public clientService : ClientService,
    public router : Router,
    public route : ActivatedRoute ,
    public flashMessagesService : FlashMessagesService,
    private settingsServices : SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsServices.getSettings().disableBalnceOnEdit
    this.id = this.route.snapshot.params['id']
    this.clientService.getClient(this.id).subscribe(client =>{
      this.client = client ;

    })
  }
  onSubmit({value,valid}:{value:Client ,valid:boolean}){
  
    if(!valid){
       this.flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 4000 });
       this.router.navigate(['edit-client/'+this.id])
    }else{

       this.clientService.updateClient(this.id ,value)
       this.flashMessagesService.show('Client Updated', { cssClass: 'alert-success', timeout: 4000 });
       this.router.navigate(['/client/'+this.id])
    }

}}


