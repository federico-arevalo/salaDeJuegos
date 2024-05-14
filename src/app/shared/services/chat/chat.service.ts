import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  addDoc,
  collection,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public user;

  constructor(
    private db: AngularFireDatabase,
    private firestore: Firestore,
    public afs: AngularFirestore
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  sendMessage(text: string) {
    const userData = {
      uid: this.user.uid,
      email: this.user.email,
      createdAt: new Date().toString(),
      message: text,
      time: serverTimestamp(),
    };

    let messages = collection(this.firestore, 'messages');
    addDoc(messages, userData);
  }

  getMessages() {
    return query(
      collection(this.firestore, 'messages'),
      orderBy('time'),
      orderBy('createdAt', 'desc')
    );
  }
}
