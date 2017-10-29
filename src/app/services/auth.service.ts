import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import {Observable} from 'rxjs'

@Injectable()
export class AuthService {

  constructor(public anFauth : AngularFireAuth) { }

  login(email:string, password :string){
    return new Promise ((resolve,reject) => {
      this.anFauth.auth.signInWithEmailAndPassword(email,password)
      .then(userData=>resolve(userData),
      err => reject(err))
    })
  }
  //check user status 
  getAuth(){
    return  this.anFauth.authState.map(auth => auth)
  }
  logout (){
    this.anFauth.auth.signOut();
  }

}
