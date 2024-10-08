import { Component } from '@angular/core';
import { ChatService } from '../../shared/services/chat/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth/auth.service';
import moment from 'moment';
import 'moment/locale/es';

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

  moment = moment;

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

  toggleChat() {
    console.log(moment.duration().humanize());
    this.email = JSON.parse(localStorage.getItem('user')!).email;
    this.isChatHidden = !this.isChatHidden;

    let col = collection(this.firestore, 'messages');

    const observable = collectionData(col);

    if (!this.isChatHidden) {
      this.sub = observable.subscribe((respuesta: any) => {
        this.messages = respuesta.sort(
          (a: any, b: any) => a.createdAt - b.createdAt
        );
        console.log(this.messages);
      });
    } else {
      this.sub.unsubscribe();
    }
  }
}
