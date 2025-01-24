import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../services/productlist.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent implements OnInit {

  products:any

  constructor(
    private productService: ProductlistService
  ){}

  ngOnInit(): void {
    console.log("OnInit")
    this.productService.getProducts().subscribe(
      (termekek) => this.products = termekek
    )
  }

}
