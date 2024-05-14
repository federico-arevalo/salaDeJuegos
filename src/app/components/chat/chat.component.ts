import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../shared/services/chat/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public message = '';
  public messages: any[] = [];
  private sub!: Subscription;
  public email;
  public isChatHidden = true;

  constructor(
    private chatService: ChatService,
    private firestore: Firestore,
    private auth: AuthService
  ) {
    console.log(auth.userData);
    if (auth.isLoggedIn)
      this.email = JSON.parse(localStorage.getItem('user')!).email;
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  public get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  hideChat() {
    this.isChatHidden = !this.isChatHidden;

    let col = collection(this.firestore, 'messages');

    const observable = collectionData(col);

    if (!this.isChatHidden) {
      this.sub = observable.subscribe((respuesta: any) => {
        this.messages = respuesta;
        console.log(respuesta);
      });
    } else {
      this.sub.unsubscribe();
    }
  }
}
