import { Injectable } from '@angular/core';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  constructor() {}

  async crearMazo() {
    const response = await fetch(`${API_BASE_URL}new/shuffle/`);
    const data = await response.json();

    return { mazoId: data.deck_id, quedan: data.remaining };
  }

  async traerCartas(mazoId: number, numberOfCards: number) {
    const response = await fetch(
      `${API_BASE_URL}${mazoId}/draw/?count=${numberOfCards}`
    );

    const data = await response.json();
    return data;
  }
}
