import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import {FirebaseListObservable} from 'angularfire2/database';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth-service';
import {BeerChickenPage} from '../../pages/beerchicken/beerchicken';
//import {BillingPage} from '../billing/billing';
import { Cart } from '../../models/cart';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartService,AuthService]
})
export class CartPage {
  
  public cart:Array<Cart> = [];
  cartItem : Cart;
  cartAmount: number;
    GST : number; 
    grandtotal : number;
     subTotal : number=0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService: CartService,
              public authService: AuthService
             ) {
               
      cartService.loadCartList(this.authService.getLoggedUID());
      this.cart = this.cartService.cartItems;
      
      
      


  }


  ngOnInit() {
    this.cartAmount=0;
    this.GST = 0;
      this.cart =[];
    this.cartService.loadCartList(this.authService.getLoggedUID())

      .subscribe(cartItem => {
        console.log("ddd",cartItem);
        //calculate total
        for(var i=0; i < cartItem.length; i++)
        {
          //CAL the total
          var item = cartItem[i];
          var subTotal = item.price * item.quantity;
          console.log("item "+i+ " subTotal:" + subTotal);
          this.cartAmount =this.cartAmount+ subTotal;
          this.GST = Math.ceil(this.cartAmount * 0.07);         
          this.grandtotal = (this.GST + this.cartAmount);
     
         
          
        }
        this.cart = cartItem;
        
      });
      console.log("ssss",this.cart);

    }

  

  ionViewDidLoad() {
    
  }


  
  increment(item : any) : void {
    this.cartAmount=0;
    console.log("before increment:" +item.quantity);
    item.quantity= item.quantity+1;
    this.cartService.updateCartItem(item);
  }
  decrement(item : any) : void {
    if (item.quantity > 1) {
      this.cartAmount=0;
      console.log("before decrement:" +item.quantity);
    item.quantity= item.quantity-1;
    this.cartService.updateCartItem(item);

    }
    else{
      alert("Quantity cannot be below 1.")


    }

    }
  

  remove(item : any) : void {
    this.cartAmount=0;
    this.GST = 0;
    this.grandtotal = 0;
    this.cartService.removeCartItem(item);
   
  }
 
  update(item : any) : void {
    this.cartService.updateCartItem(item);
  }
 

  checkout() : void {
   this.navCtrl.push(PaymentPage);
  }

  goBack() {
      this.navCtrl.pop();
  }
  

}
