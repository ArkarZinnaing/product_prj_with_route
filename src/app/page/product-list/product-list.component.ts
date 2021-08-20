import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/sharedservice.service';
import { ProductServiceService } from '../../service/product-service.service';
import { Product } from '../../modal/product.modal'
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchText;  // for search filter
  product_id;
  product: Product[]

  constructor(
    private _shared: SharedService,
    public _product_service: ProductServiceService
  ) {
    this.getAllProduct()
  }

  getAllProduct() {
    this._product_service.getAllProduct();
  }

  editProduct(id) {
    this._shared.router.navigate(["/manage-product", id]);
  }

  deleteProduct(id) {
    this.product_id = id
  }

  ngOnInit(): void {
  }

}
