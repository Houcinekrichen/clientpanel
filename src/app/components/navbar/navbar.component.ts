import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import 'rxjs/add/operator/map'
import {SettingsService} from '../../services/settings.service'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : boolean
  LoggedInUser : string
  showRegister : boolean


  constructor(
  private authService :AuthService,
  private router : Router,
  private flashMessagesService:FlashMessagesService,
  private settingsServices : SettingsService) { }

  ngOnInit() {
    this.showRegister = this.settingsServices.getSettings().allowRegistration
   this.authService.getAuth().subscribe(auth =>{
     if(auth){
        this.isLoggedIn = true
        this.LoggedInUser = auth.email
     }else{
        this.isLoggedIn = false
     }
   })
  }
  onLogOut(){
    this.authService.logout()
    this.flashMessagesService.show('you are logged out', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/login'])


  }
}
