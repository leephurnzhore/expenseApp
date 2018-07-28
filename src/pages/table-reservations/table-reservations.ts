import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TableReservation} from '../../models/TableReservation';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {TableReservationService} from '../../providers/TableReservationService'
import { ReviewTransactionPage } from '../review-transaction/review-transaction';
@Component({
  selector: 'page-table-reservations',
  templateUrl: 'table-reservations.html'
})
export class TableReservationsPage {

  reservation: TableReservation;
submitted = false;

  constructor(public navCtrl: NavController, public tablereservationservice : TableReservationService) {
       this.reservation = new TableReservation("", "", "", "", "");
  }
  get testing() { return JSON.stringify(this.reservation); }
  onSubmit(form: NgForm) {
    this.submitted = true;
    
   if(this.reservation.bookingdate =="" ){

      alert('Please fill in date of booking')
    }
    else if(this.reservation.people  =="" ){

      alert('Please fill in the number of people')
    }
    else if(this.reservation.adults =="" ){

      alert('Please fill in the number of adults')
    }
    else if(this.reservation.children  =="" ){

      alert('Please fill in the number of children')
    }
else{
      this.tablereservationservice.addItem(this.reservation);
      alert('Details submitted:'
        + "\n Table Number: " + this.reservation.tableno
        + "\n Booking Date: " + this.reservation.bookingdate
        + "\n Number of people: " + this.reservation.people
        + "\n Number of adults: " + this.reservation.adults
        + "\n Number of children: " + this.reservation.children);
        this.navCtrl.push(ReviewTransactionPage);

    }
  }

}
