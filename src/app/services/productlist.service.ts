import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {

  private base = "http://localhost:3000/termekek/"
  private productsSub = new BehaviorSubject<any>(null)

  constructor(
    private http: HttpClient
  ) {
    this.downloadProducts()
  }

  getProducts(){
    return this.productsSub;
  }

  private downloadProducts(){
    this.http.get(this.base).subscribe(
      (product) => this.productsSub.next(product)
    )
  }

  postProduct(product:any){
    this.http.post(this.base,product).forEach(
      () => this.downloadProducts()
    )
  }

  putProduct(product:any){
    this.http.put(this.base+product.id,product).forEach(
      () => this.downloadProducts()
    )
  }

  deleteProduct(product:any){
    this.http.delete(this.base+product.id).forEach(
      () => this.downloadProducts()
    )
  }

}
