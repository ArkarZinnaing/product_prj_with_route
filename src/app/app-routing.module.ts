import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './page/add-product/add-product.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ManageProductComponent } from './page/manage-product/manage-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'manage-product/:id',
    component: ManageProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
