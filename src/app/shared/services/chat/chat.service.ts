import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public user;

  constructor(private firestore: Firestore, public afs: AngularFirestore) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  sendMessage(text: string) {
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.user);
    const userData = {
      uid: this.user.uid,
      email: this.user.email,
      createdAt: new Date(),
      message: text,
    };

    let messages = collection(this.firestore, 'messages');
    addDoc(messages, userData);
  }

  getMessages() {
    return query(
      collection(this.firestore, 'messages'),
      orderBy('createdAt', 'desc')
    );
  }
}
