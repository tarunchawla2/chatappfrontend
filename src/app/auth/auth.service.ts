import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + "/user/"


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationResp = new BehaviorSubject(false);
  isAuthenticated = false;
  usersExists = new Subject<boolean>();
  validCredentials = new Subject<boolean>();
  private authStatusListener = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    }
    console.log('Bakend url ', BACKEND_URL)
    this.httpClient.post<{ token: string, userId: string, username: string }>(BACKEND_URL + 'login', authData)
      .subscribe(response => {
        console.log('response in sub')
        const token = response.token;
        const userId = response.userId;
        const username = response.username;
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        this.authenticationResp.next(true);
        this.saveAuthData(token, userId, username);
        this.validCredentials.next(true);
        this.router.navigate(['/chat']);
      }, error => {
        this.isAuthenticated = false;
        this.validCredentials.next(false);
        this.authenticationResp.next(false);
        this.authStatusListener.next(false);
      })
  }
  logout() {
    this.authenticationResp.next(false);
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    this.clearAuthData();
    this.router.navigate(['/login'])
  }

  private saveAuthData(token: string, userId: string, username: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId)
    localStorage.setItem("username", username)
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  }
  getLoggedInUser() {
    return localStorage.getItem("username")
  }
  signUp(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    }
    this.httpClient.post(BACKEND_URL + 'signup', authData)
      .subscribe(response => {
        console.log('Response ', response)
        this.usersExists.next(false)
        this.router.navigate(['/login']);
      }, (err) => {
        this.usersExists.next(true);
        console.log(err.error)
      })
  }
  autoLogin() {
    const userData: {
      username: string,
      userId: string,
      token: string,
    } = {
      username: localStorage.getItem('username'),
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token')
    }
    if (userData.username && userData.userId && userData.token) {
      this.authStatusListener.next(true);
      this.isAuthenticated = true;
      this.authenticationResp.next(true);
      this.router.navigate(['/chat'])
    } else {
      return;
    }
  }
}
