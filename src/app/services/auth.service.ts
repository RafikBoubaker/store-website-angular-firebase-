import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
user: Observable<firebase.User>;
  
  constructor(private fa:AngularFireAuth) {
    this.user=this.fa.user
}


signUp(email,password){
  return this.fa.createUserWithEmailAndPassword(email,password)  
   }
   signIn(email,password){
     return this.fa.signInWithEmailAndPassword(email,password)
   }
  }