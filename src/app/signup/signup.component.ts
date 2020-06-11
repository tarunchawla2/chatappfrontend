import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  userExists = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
    this.authService.usersExists.subscribe(response => {
      this.userExists = true;
    })
  }
  onSubmit() {
    let username = this.signUpForm.value.username;
    let password = this.signUpForm.value.password;
    this.authService.signUp(username, password)
  }

}
