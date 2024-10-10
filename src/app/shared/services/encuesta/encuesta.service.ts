import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  constructor(private firestore: Firestore) {}

  sendEncuesta(encuesta: any) {
    const newEncuesta = {
      nombre: encuesta.nombre,
      edad: encuesta.edad,
      genero: encuesta.genero,
      satisfaction: encuesta.satisfaction,
      juegosfav: encuesta.juegosfav,
      msj: encuesta.msj,
      fecha: new Date(),
    };

    let encuestas = collection(this.firestore, 'encuestas');
    addDoc(encuestas, newEncuesta);
  }
}
