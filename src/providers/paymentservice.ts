import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Expense } from '../models/expense';

import { AuthService } from './auth-service';
import { paymentdetails } from '../models/paymentdetails';
import {Cart} from '../models/cart';


@Injectable()

export class paymentservice {

  paymentlist: Cart[]; // Stores the expense list for search functionality



  constructor(private db: AngularFireDatabase, private authService: AuthService) {

  }



  getItems(): Observable<any[]> {

    let expenseObservable: Observable<any[]>;



    expenseObservable = this.db.list('/CardDetails/').snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));



    expenseObservable.subscribe(result => {

      this.paymentlist = result;

    });

    return expenseObservable;

  }



  getItemsByStatus(status: string): Observable<any[]> {

    return this.db.list('/CardDetails/', ref => ref.orderByChild('creditcardnumber').equalTo(status)).snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

  }



  searchItems(val: string): Cart[] {

    if (!val || !val.trim()) {

      // if no search term, return all expenses.

      return this.paymentlist;

    }

    val = val.toLowerCase();



    // Filter locally instead of invoking multiple calls to server

    // esp when user types character by charcter in search bar

    return this.paymentlist.filter(item =>

      item.name.toLowerCase().includes(val) ||

      item.category.toLowerCase().includes(val)) ;

     // item.price && item.price.toLowerCase().includes(val));

  

  }

  addItem(item) {

    let user = this.authService.getCurrentUser();

    if (user != null) {

      if (user.displayName != null)

        item.user = user.displayName;

      else if (user.email != null)

        item.user = user.email;

    }
    this.db.list('/CardDetails/').push(item);
  }


  removeItem(item) {

    this.db.list('/CardDetails/').remove(item.key);

  }



  updateItem(item) {

    this.db.list('/CardDetails/').update(item.key, item);

  }



}
