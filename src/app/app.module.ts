import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import {FormsModule} from '@angular/forms'
import { FlashMessagesModule } from 'angular2-flash-messages';
// angularFire Import
import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabase} from 'angularfire2/database-deprecated'
import {AngularFireAuth} from 'angularfire2/auth'
// Component Import
import { AppComponent } from './app.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ClientComponent } from './components/client/client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddclientComponent } from './components/addclient/addclient.component';
import { EditclientComponent } from './components/editclient/editclient.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// serive import
import {ClientService} from './services/client.service' ;
import {AuthService} from './services/auth.service' ;
import {AuthGuard} from "./guards/auth.guard"
import {RegisterGuard} from "./guards/register.guard"
import {SettingsService}from './services/settings.service' ;

const appRoutes : Routes =[

  {path:'',component:DashbordComponent,canActivate:[AuthGuard] },
  {path:'register',component:RegisterComponent,canActivate:[RegisterGuard]},
  {path:'login',component:LoginComponent},
  {path:'addclient',component:AddclientComponent,canActivate:[AuthGuard]},
  {path:'client/:id',component:ClientDetailsComponent,canActivate:[AuthGuard]},
  {path:'edit-client/:id',component:EditclientComponent,canActivate:[AuthGuard]}
  
]

export const fireBaseConfig = {
  apiKey: "AIzaSyAEfi9OtYRnuCAzaC-IzXmIDud2ELGVbZY",
  authDomain: "clientpanel-284c3.firebaseapp.com",
  databaseURL: "https://clientpanel-284c3.firebaseio.com",
  projectId: "clientpanel-284c3",
  storageBucket: "clientpanel-284c3.appspot.com",
  messagingSenderId: "673406086955"
}
@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    ClientComponent,
    ClientDetailsComponent,
    AddclientComponent,
    EditclientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(fireBaseConfig),
    FlashMessagesModule
  ],
  providers: [AngularFireAuth,AuthGuard,SettingsService,RegisterGuard,
  AngularFireDatabase,ClientService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
