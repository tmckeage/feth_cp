import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Auth } from '@aws-amplify/auth';

@Injectable()
export class AuthService {
  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn() : boolean {
    return  localStorage.getItem('token') != null;
  }
  
  setJWTToken(token: any) {
    localStorage.setItem('token', token);
  }

  getJWTToken() {
    return localStorage.getItem('token');
  }

  setAccessToken(token: any) {
    localStorage.setItem('token', token);
  }

  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => console.log({ user }))
      .catch(err => console.log(err))
  }
 
}