import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSubs = this.authService.authenticationResp.subscribe(response => {
      this.isAuthenticated = response;
    })
  }

  onUserAction() {

  }
  onLogout(){
    this.authService.logout()
  }

}
