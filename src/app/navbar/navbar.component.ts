import { Component } from '@angular/core';
import { BasketService } from '../services/services-basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  kosar:any[] = []
  db:any = null

  constructor(
    private basketService:BasketService
  ){
    basketService.kosar$.subscribe(
      (kosar) => {
        this.kosar = kosar
        this.db = null;
        kosar.forEach(
          (termek) => {
            this.db += termek.db
          }
        )
      }
    )
  }

  menu = false;

  toggleMenu(){
    this.menu = !this.menu
  }

}
