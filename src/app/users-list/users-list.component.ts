import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users;
  constructor(private chatService: ChatService, private authService:AuthService) { }

  ngOnInit(): void {
    this.chatService.getAllUsers()
      .subscribe(users => {
        this.users = users
      })
  }

}
