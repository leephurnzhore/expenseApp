import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { paymentdetails} from '../../models/paymentdetails';
import { paymentservice } from '../../providers/paymentservice';
import { ReviewTransactionPage } from '../review-transaction/review-transaction';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  // creditcardnumber: string;
  // month:string;
  // nameoncreditcard : string;
  // year : string;
  // verificationcode : string;
   months: string[];
  payment : paymentdetails;
submitted = false;

  constructor(public navCtrl: NavController, public paymentservice : paymentservice ) {
    this.months=['1','2','3','4','5','6','7','8','9','10','11','12'];
    this.payment = new paymentdetails("", "", "", "", "");
  }
  
  get testing() { return JSON.stringify(this.payment); }
  onSubmit(form: NgForm) {
    this.submitted = true;
    
    if (this.payment.creditcardnumber =="") {
alert('Please fill in credit card number')
    }
    else if(this.payment.nameoncreditcard=="" ){

      alert('Please fill in name on credit card')
    }
    else if(this.payment.month =="" ){

      alert('Please fill in month')
    }
    else if(this.payment.year=="" ){

      alert('Please fill in year')
    }
    else if(this.payment.verificationcode =="" ){

      alert('Please fill in verification code')
    }
else{
      this.paymentservice.addItem(this.payment);
      alert('Details submitted:'
        + "\n credicardnumber: " + this.payment.creditcardnumber
        + "\n nameoncreditcard: " + this.payment.nameoncreditcard
        + "\n month: " + this.payment.month
        + "\n year: " + this.payment.year
        + "\n verificationcode: " + this.payment.verificationcode);
        this.navCtrl.push(ReviewTransactionPage);

    }
  }


    Cancel() : void {
      this.navCtrl.push(ReviewTransactionPage);
    }
  
  }


