import { Component, OnInit  } from '@angular/core';
import { NavController } from 'ionic-angular';


import {Cart} from '../../models/cart';
import {CartService} from '../../providers/cart.service';
import {paymentservice} from '../../providers/paymentservice'
import {AuthService} from '../../providers/auth-service';
import { TableReservationsPage } from '../table-reservations/table-reservations';
import { ReviewTransactionPage } from '../review-transaction/review-transaction';

@Component({
  selector: 'page-confirmpayment',
  templateUrl: 'confirmpayment.html'
})
export class ConfirmpaymentPage {


    cartItems: Cart[];
  public cart:Array<Cart> = [];
  cartItem : Cart;
  cartAmount: number;
    GST : number; 
    grandtotal : number;
     subTotal : number=0;
     providers: [CartService, AuthService]
  getItems(ev: any) {

    let val = ev.target.value;

    console.log("search " + val);



    this.cartItems = this.CartService.searchItems(val)

  }


  constructor(public navCtrl: NavController,  public CartService: CartService,public  authService: AuthService ) {
  }


  ngOnInit() {
    this.cartAmount=0;
    this.GST = 0;
      this.cart =[];
    this.CartService.loadCartList(this.authService.getLoggedUID())

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
      
        this.CartService.getItems()
  
          .subscribe(cartItems => {
  
            this.cartItems = cartItems;
          }
  
          );

  
       

    }
    abc() : void {
      this.navCtrl.push(TableReservationsPage);
    }
}
