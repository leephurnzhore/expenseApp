import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import {Cart} from '../models/cart';
import { map } from 'rxjs/operators';
import { AuthService } from './auth-service';
import { ApproveExpensePage } from '../pages/approve-expense/approve-expense';
import { Item } from 'ionic-angular';
import { removeArrayItem } from 'ionic-angular/util/util';
@Injectable()
export class CartService {
  //expenseList: Expense[];
  cartItems: Cart[];
  //orderItems: FirebaseListObservable<any>;

  cartAmount: number = 0;
  constructor(public db: AngularFireDatabase,
    private  authService:  AuthService,
  ) { }
 
  loadCartList(userid: string) : Observable<any[]>{
    
      let cartObservable: Observable<any[]>;
      cartObservable = this.db.list('/cartItem/').snapshotChanges().pipe(
    map(changes =>
           changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
           cartObservable.subscribe(result => {
        this.cartItems = result;
  
      });
  
      return cartObservable;

  }
  

  addCartItem(product: any) {

    
    let user = this.authService.getCurrentUser();

    if (user != null) {

    if (user.email != null)
        product.user = user.email;

    }
    this.db.list('/cartItem/').push(product);


  };

  removeCartItem(item) {

    this.db.list('/cartItem/').remove(item.key);

  }
  
  updateCartItem(item) {
    console.log("item updated:" +JSON.stringify(item));
    this.db.list('/cartItem/').update(item.key, item);

  }


  // Order services
  checkout(userid: string, deliveryDetails: string) {

    // // Loads the subscribed cart list
     this.loadCartList(userid);

    // // loads the unsubscribed cart list
    // var cartItemUnsubscribed = this.db.list('cart/' + userid).take(1);

    // // Add items to orders
    // var orderItem: cartObservable<any> = this.db.list('orders/' + userid);

    // // Because subscribed cart list would prevent adding items to cart after an order is created.
    // cartItemUnsubscribed.forEach(rows => {
    //   rows.forEach(cartItem => {

    //     cartItem.status = 1;
    //     cartItem.delivery = deliveryDetails;

    //     // check if product is available
    //     this.db.object('products/' + cartItem.$key, { preserveSnapshot: true }).first().subscribe(productData => {
    //       //%%%%%%%%%%%%%%%%
    //       if (cartItem.quantity <= productData.val().stock && productData.val().available == true) {

    //         orderItem.push(cartItem); // add the item to orders

    //         this.cartItems.removeCartItem(cartItem.$key); // remove the item from the cart

    //         // decrement the item qty
    //         this.db.object('products/' + cartItem.$key + '/stock').set(productData.val().stock - cartItem.quantity);


    //       }

    //       //%%%%%%%%%%%%%%%%
    //     });

    //   });
    // });


  }

 
  getItems(): Observable<any[]> {

    let expenseObservable: Observable<any[]>;



    expenseObservable = this.db.list('/cartItem/').snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));



    expenseObservable.subscribe(result => {

      this.cartItems = result;

    });

    return expenseObservable;

  }
  searchItems(val: string): Cart[] {

    if (!val || !val.trim()) {

      // if no search term, return all expenses.

      return this.cartItems;

    }

    val = val.toLowerCase();



    // Filter locally instead of invoking multiple calls to server

    // esp when user types character by charcter in search bar

    return this.cartItems.filter(item =>

      item.name.toLowerCase().includes(val) ||

      item.category.toLowerCase().includes(val)) ;

     // item.price && item.price.toLowerCase().includes(val));

  

  }
  
  removeItem(item) {

    this.db.list('/cartItem/').remove(item.key);

  }
}
