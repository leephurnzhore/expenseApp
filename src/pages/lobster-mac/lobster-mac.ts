import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cart } from '../../models/cart';
// import { NgModule, ErrorHandler } from '@angular/core';

// import { FormsModule } from '@angular/forms';

import {CartService} from '../../providers/cart.service';
//import {AuthService} from '../../providers/auth-service';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-lobster-mac',
  templateUrl: 'lobster-mac.html'
})
export class LobsterMacPage {
    cartItem : Cart;
  
  value: number = 1; 
    constructor(public navCtrl: NavController, public cartService : CartService) {
   
      this.cartItem = new Cart("assets/img/lobster.png", "Truffled Lobster Mac & Cheese", "Signature", 48.00, 0);
     
    }
    submit(){
  
      this.cartItem.quantity=this.value;
      this.cartService.addCartItem(this.cartItem);
      this.navCtrl.push(CartPage);
      alert('Successfully Added');
    }
    increment()  {
      //console.log("before", this.cartItem.quantity);
      this.cartItem.quantity++;
      this.value = this.cartItem.quantity;
      //console.log("after", this.cartItem.quantity);
    }
    decrement()  {
      //console.log(this.cartItem.quantity);
      if (this.cartItem.quantity < 2) {
        //console.log(this.cartItem.quantity);
        alert("Quantity has to be at least 1");
       }
      
      else{
        //console.log("before", this.cartItem.quantity);
        //this.value = this.cartItem.quantity;
        this.cartItem.quantity--;
        this.value = this.cartItem.quantity;
        //console.log("after", this.cartItem.quantity);
  
  
      }
  
      }
    
      plus(){
        console.log(this.value);
      }
    
  }
  