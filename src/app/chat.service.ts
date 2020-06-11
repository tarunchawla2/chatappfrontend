import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private httpClient: HttpClient) {

  }

  getAllUsers() {
    return this.httpClient.get(BACKEND_URL + '/user/all');
  }

  getChatRoomsChat(chatRoom) {
    return this.httpClient.get<[{ user: String, message: String }]>(BACKEND_URL + '/chatroom/' + chatRoom);
  }
}
