import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/sharedservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../../service/product-service.service'
declare var $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  submitted = false;
  form: FormGroup;

  alert = [];    // for alart dialog


  get f() { return this.form.controls; }


  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    public _product_service: ProductServiceService
  ) {
    this._product_service.getAllProduct()

    //Validate all text inputs
    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      price: ['',  Validators.required]
    });
  }

  createProduct() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let data = {
      id: '',
      name: this.f.name.value,
      price : this.f.price.value,
    }
    // Check values are blank or not
    if (this.f.name.value != '' && this.f.price.value != '') {

      //check duplicate product name 
      if (this._product_service.checkData(this.f.name.value, '', "add")) {

        this._product_service.createProduct(data).toPromise().then(
          (result) => {
            $('#alert_modal').modal('hide')
            this._shared.toastrService.success('Contact Save successfully !', 'Contact');
            this._shared.location.back()
          });

      } else {
        $('#alert_modal').modal('show')
        this.alert = this._product_service.alert
      }

    }

  }


  ngOnInit(): void {
  }

}
