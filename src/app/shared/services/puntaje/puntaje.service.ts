import { Injectable } from '@angular/core';
import { addDoc, collection as c, Firestore } from '@angular/fire/firestore';
import { collection, DocumentData, getDocs } from 'firebase/firestore';

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

    let puntajes = c(this.firestore, 'puntajes');
    addDoc(puntajes, newPuntaje);
  }

  async getPuntajes() {
    let puntajes: DocumentData[] = [];

    const querySnapshot = await getDocs(collection(this.firestore, 'puntajes'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data());
      puntajes.push(doc.data());
    });

    return puntajes;
  }
}
