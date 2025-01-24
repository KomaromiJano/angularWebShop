import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../services/productlist.service';
import { BasketService } from '../services/services-basket.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent implements OnInit {

  products:any
  kosar:any

  constructor(
    private productService: ProductlistService,
    private basketService: BasketService
  ){}

  add(product:any,db:any){
    this.basketService.addBasket(product,1);
  }

  ngOnInit(): void {
    console.log("OnInit")
    this.productService.getProducts().subscribe(
      (termekek) => this.products = termekek
    )
    this.basketService.kosar$.subscribe(
      (kosar) => {
        console.log(kosar)
        let temp_kosar:any = {}
        kosar.forEach(
          (termek) => {
            //console.log("Termék: ",termek.db)
            temp_kosar[termek.termek.id] = termek
          }
        )
        this.kosar = temp_kosar
      }
    )
    console.log(this.kosar)
  }

}
