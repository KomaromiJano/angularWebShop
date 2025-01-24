import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: "products",
    component: ProductlistComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "",
    redirectTo: "/products",
    pathMatch: "full" // Hozzáadva a pathMatch
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
