import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service'
import {FlashMessagesService} from "angular2-flash-messages"
import {Router,ActivatedRoute,Params} from "@angular/router"
import {Client } from "../../models/client"

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id : string 
  client :Client 
  hasBalance : Boolean = false 
  showBalanceUpdateInput : boolean = false ;

  constructor(
    public clientService : ClientService,
    public router : Router,
    public route : ActivatedRoute ,
    public flashMessagesService : FlashMessagesService
  ) { }

  ngOnInit() {
    //Get id 
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client =>{
      if(client.balance > 0) {
        this.hasBalance = true
      }
      this.client = client
      
    })
  }

  updateBalance(id :string){
    this.clientService.updateClient(id,this.client);
    this.flashMessagesService.show('balance updaded !', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/client/'+this.id])

  }
  onDeleteClick(){
    this.clientService.deleteClient(this.id)
    this.flashMessagesService.show('client removed ', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/'])
  }
  

}
