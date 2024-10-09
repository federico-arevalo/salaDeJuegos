import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PuntajeService {
  constructor(private firestore: Firestore) {}

  sendPuntaje(juego: string, puntaje: number) {
    const user = JSON.parse(localStorage.getItem('user')!);

    const newPuntaje = {
      user: user.email,
      juego: juego,
      fecha: new Date(),
      puntaje: puntaje,
    };

    let puntajes = collection(this.firestore, 'puntajes');
    addDoc(puntajes, newPuntaje);
  }

  getPuntajes() {
    return query(
      collection(this.firestore, 'puntajes'),
      orderBy('createdAt', 'desc')
    );
  }
}
