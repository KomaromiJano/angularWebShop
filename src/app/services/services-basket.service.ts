import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private kosar = new BehaviorSubject<any[]>(this.loadBasket()); // Kosár alapértelmezett állapota
  kosar$ = this.kosar.asObservable(); // Kosár adatainak megfigyelése

  constructor() { }

  // Kosár adatainak betöltése a localStorage-ból
  private loadBasket(): any[] {
    const storedBasket = localStorage.getItem('kosar');
    return storedBasket ? JSON.parse(storedBasket) : []; // Ha nincs mentett kosár, üres listát adunk vissza
  }

  // Kosár adatainak mentése a localStorage-ba
  private saveBasket(kosar: any[]): void {
    localStorage.setItem('kosar', JSON.stringify(kosar)); // A kosarat JSON formátumban mentjük
  }

  // Termék hozzáadása a kosárhoz
  addBasket(termek: any, db: number): void {
    const aktualisKosar = this.kosar.getValue(); // Jelenlegi kosár adatainak lekérése
    const index = aktualisKosar.findIndex(item => item.termek.id === termek.id); // Ellenőrizzük, hogy létezik-e már a termék a kosárban

    if (index > -1) {
      // Ha létezik, frissítjük a darabszámot
      aktualisKosar[index].db += db;
    } else {
      // Ha nem létezik, hozzáadjuk új termékként
      aktualisKosar.push({ termek, db });
    }

    this.saveBasket(aktualisKosar); // A kosár adatainak mentése a localStorage-ba
    this.kosar.next(aktualisKosar); // A kosár új állapotának beállítása
  }

  updateItemQuantity(termekId: string, newQuantity: number): void {
    const aktualisKosar = this.kosar.getValue();
    const index = aktualisKosar.findIndex(item => item.termek.id === termekId);

    if (index > -1) {
      if (newQuantity > 0) {
        // Ha az új mennyiség nagyobb, mint 0, akkor frissítjük a darabszámot
        aktualisKosar[index].db = newQuantity;
      } else {
        // Ha a mennyiség 0, eltávolítjuk a terméket
        aktualisKosar.splice(index, 1);
      }
    }

    this.saveBasket(aktualisKosar);
    this.kosar.next(aktualisKosar);
  }

  // Termék eltávolítása a kosárból
  removeBasket(termekId: string): void {
    const aktualisKosar = this.kosar.getValue();
    const index = aktualisKosar.findIndex(item => item.termek.id === termekId);
  
    if (index > -1) {
      if (aktualisKosar[index].db > 1) {
        // Ha több darab van, csökkentjük a darabszámot
        aktualisKosar[index].db -= 1;
      } else {
        // Ha csak egy darab van, eltávolítjuk a terméket
        aktualisKosar.splice(index, 1);
      }
    }
  
    this.saveBasket(aktualisKosar); // A kosár adatainak mentése a localStorage-ba
    this.kosar.next(aktualisKosar); // Az új kosár állapotának beállítása
  }
  

  // Kosár kiürítése
  clearBasket(): void {
    this.saveBasket([]); // Üres kosár mentése a localStorage-ba
    this.kosar.next([]); // Kosár törlése
  }

}
