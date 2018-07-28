import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';



import { AuthService } from './auth-service';
import { paymentdetails } from '../models/paymentdetails';
import {TableReservation} from '../models/TableReservation';

@Injectable()
export class TableReservationService{

    Reservationlist: TableReservation[];
constructor(private db: AngularFireDatabase, private authService: AuthService){}




getItems(): Observable<any[]> {

    let expenseObservable: Observable<any[]>;



    expenseObservable = this.db.list('/ReservedTables/').snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));



    expenseObservable.subscribe(result => {

      this.Reservationlist = result;

    });

    return expenseObservable;

  }



  getItemsByStatus(status: string): Observable<any[]> {

    return this.db.list('/ReservedTables/', ref => ref.orderByChild('tableno').equalTo(status)).snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

  }

/** 

  searchItems(val: string): TableReservation[] {

    if (!val || !val.trim()) {

      // if no search term, return all expenses.

      return this.Reservationlist;

    }

    val = val.toLowerCase();



    // Filter locally instead of invoking multiple calls to server

    // esp when user types character by charcter in search bar

    return this.Reservationlist.filter(item =>

      item.name.toLowerCase().includes(val) ||

      item.category.toLowerCase().includes(val)) ;

     // item.price && item.price.toLowerCase().includes(val));

  

  }
  **/

  addItem(item) {

    let user = this.authService.getCurrentUser();

    if (user != null) {

      if (user.displayName != null)

        item.user = user.displayName;

      else if (user.email != null)

        item.user = user.email;

    }
    this.db.list('/ReservedTables/').push(item);
  }







}
