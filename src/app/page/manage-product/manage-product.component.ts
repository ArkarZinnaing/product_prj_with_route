import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/sharedservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../../service/product-service.service';
import { Product } from 'src/app/modal/product.modal';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  routedata;
  submitted = false;
  form: FormGroup;
  product;
  alert = [];   // for alart dialog
  product_id;

  get f() { return this.form.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    public _product_service: ProductServiceService,
    private activeRoute: ActivatedRoute
  ) {
    this._product_service.getAllProduct()
    this.LoadData();
  }


  LoadData() {
    this.routedata = this.activeRoute.snapshot.params;
    this.product_id =  this.routedata.id

    //Validate all text inputs
    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.product = [this._product_service.getCustomProduct(this.routedata.id)];
  }

  updateProduct() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let data = {
      id: this.routedata.id,
      name: this.f.name.value,
      price : this.f.price.value
    }

    // Check values are blank or not
    if (this.f.name.value != '' && this.f.price.value != '') {

      //check duplicate product name
      if (this._product_service.checkData(this.f.name.value, this.routedata.id, "edit")) {

        this._product_service.updateProduct(data).subscribe(
          (result: Product) => {
            $('#alert_modal').modal('hide')
            this._shared.toastrService.success('Contact updated successfully !', 'Contact');
            this._shared.location.back()

          });
      } else {
        $('#alert_modal').modal('show')
        this.alert = this._product_service.alert
      }
    }


  }

  //back to product-list
  backPage() {
    this._shared.location.back()
  }

  ngOnInit(): void {
  }

}
