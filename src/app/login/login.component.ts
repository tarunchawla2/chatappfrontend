import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidCredentials = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
    this.authService.validCredentials.subscribe(response => {
      console.log('Inside response')
      this.invalidCredentials = !response;
    })
  }
  onSubmit() {
    console.log(this.loginForm);
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authService.login(username, password)
  }

}
