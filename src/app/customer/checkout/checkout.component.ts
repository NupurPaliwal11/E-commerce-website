import { Component, OnInit } from '@angular/core';
import { Cart, Order } from '../../models/dataTypes';
import { FormBuilder } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  public cart: Cart[] | undefined
  public totalPrice: number | undefined

  constructor(private fb: FormBuilder, private shopService: ShopService, private router: Router){}

  addressForm = this.fb.group({
    address: [''],
    email: [''],
    contact: ['']
  })

  ngOnInit(): void {
    this.shopService.getCart().subscribe((res)=>{
      this.cart = res.cart.products
      let price = 0
      res.cart.products.forEach((item: any)=>{
        if(item.quantity && item.price){
          price+= (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + price/10 + 100
    })
  }

  submitOrder(){
    // let addressDetails = this.addressForm.value as Order
    // if(this.totalPrice){
    //   let orderData:Order = { ...addressDetails, cartTotal: this.totalPrice}
      
      // this.cart?.forEach((item)=>{
      //   this.shopService.removeItemFromCart(item.productId).subscribe((res)=>{
      //     // console.log(res);
      //     this.shopService.getCartCount()
      //   })
      // })
    // }
  }
}
