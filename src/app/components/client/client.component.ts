import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients:any[] ;
  totalOwed : number

  constructor(
    public clientService:ClientService
  ) { 
    
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalLowed();
    });
    
   
  }
  getTotalLowed(){
    let total = 0
    for(let i= 0 ; i < this.clients.length; i++){
      total += parseFloat(this.clients[i].balance );
    }
    console.log(total)
   this.totalOwed = total ;
  }

}
