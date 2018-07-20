import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Expense } from '../models/expense';

import { AuthService } from './auth-service';



@Injectable()

export class ExpenseFbProvider {

  expenseList: Expense[]; // Stores the expense list for search functionality



  constructor(private db: AngularFireDatabase, private authService: AuthService) {

  }



  getItems(): Observable<any[]> {

    let expenseObservable: Observable<any[]>;



    expenseObservable = this.db.list('/expenseItems/').snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));



    expenseObservable.subscribe(result => {

      this.expenseList = result;

    });

    return expenseObservable;

  }



  getItemsByStatus(status: string): Observable<any[]> {

    return this.db.list('/expenseItems/', ref => ref.orderByChild('status').equalTo(status)).snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

  }



  searchItems(val: string): Expense[] {

    if (!val || !val.trim()) {

      // if no search term, return all expenses.

      return this.expenseList;

    }

    val = val.toLowerCase();



    // Filter locally instead of invoking multiple calls to server

    // esp when user types character by charcter in search bar

    return this.expenseList.filter(item =>

      item.merchant.toLowerCase().includes(val) ||

      item.category.toLowerCase().includes(val) ||

      item.notes && item.notes.toLowerCase().includes(val));

  }



  addItem(item) {

    let user = this.authService.getCurrentUser();

    if (user != null) {

      if (user.displayName != null)

        item.user = user.displayName;

      else if (user.email != null)

        item.user = user.email;

    }
    this.db.list('/expenseItems/').push(item);
  }


  removeItem(item) {

    this.db.list('/expenseItems/').remove(item.key);

  }



  updateItem(item) {

    this.db.list('/expenseItems/').update(item.key, item);

  }



}
