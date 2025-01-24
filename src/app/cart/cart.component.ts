import { Component } from '@angular/core';
import { BasketService } from '../services/services-basket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  kosar: any[] = [];
  totalPrice: number = 0;

  constructor(
    private basketService: BasketService
  ) {
    this.basketService.kosar$.subscribe(
      (kosar) => {
        this.kosar = kosar;
        this.calculateTotalPrice()
      }
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.kosar.reduce((acc, item) => {
      return acc + item.termek.ar * item.db;
    }, 0);
  }

  // Kosár frissítése az új darabszámmal
  updateQuantity(termekId: string, newQuantity: number): void {
    if (newQuantity <= 0) {
      // Ha a darabszám 0, akkor töröljük a terméket
      this.removeFromBasket(termekId);
    } else {
      // Ha a darabszám változik, akkor frissítjük
      this.basketService.updateItemQuantity(termekId, newQuantity);
    }
  }

  removeFromBasket(termekId: string): void {
    this.basketService.removeBasket(termekId);
  }

  clearBasket(): void {
    this.basketService.clearBasket();
  }

}
