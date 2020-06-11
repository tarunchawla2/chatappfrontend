import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ChatService } from '../chat.service';
import { WebsocketService } from '../websocket.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  username: String;
  chatroom;
  message: String;
  messageArray: Array<{ user: String, message: String }> = [];
  isTyping = false;

  constructor(private chatService: ChatService, private authService: AuthService,
    private route: ActivatedRoute, private router: Router, private webSocketService: WebsocketService) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      console.log('Message Array', this.messageArray)
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit(): void {
    console.log('Hello')
    this.username = this.route.snapshot.queryParamMap.get('username');
    this.initMessages()
    this.route.queryParamMap.subscribe(params => {
      console.log('response in chat room ' + params.get('username'))
      this.username = params.get('username');
      this.initMessages()
    })
  }
  initMessages() {
    const currentUser = this.authService.getLoggedInUser();
    if (currentUser < this.username) {
      console.log('hey')
      this.chatroom = currentUser.concat(this.username.toString());
    } else {
      console.log('hey')
      this.chatroom = this.username.concat(currentUser);
    }
    this.webSocketService.joinRoom({ user: this.authService.getLoggedInUser(), room: this.chatroom });
    this.chatService.getChatRoomsChat(this.chatroom).subscribe(messages => {
      this.messageArray = messages;
    });
  }
  sendMessage() {
    this.webSocketService.sendMessage({ room: this.chatroom, user: this.authService.getLoggedInUser(), message: this.message });
    this.message = '';
  }

  typing() {
    this.webSocketService.typing({ room: this.chatroom, user: this.authService.getLoggedInUser() });
  }
  getLoggedInUser() {
    return this.authService.getLoggedInUser()
  }
}
