import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense } from '../../models/expense';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ExpenseFbProvider } from '../../providers/expense-firebase';

@Component({
  selector: 'page-submit-expense',
  templateUrl: 'submit-expense.html'
}) 
export class SubmitExpensePage {
  categories: string[];
  expense: Expense;
  submitted = false;
  constructor(public navCtrl: NavController, private expenseProvider: ExpenseFbProvider) {
    this.categories = ['Travel', 'Meals', 'Accomodation', 'Others'];
    this.expense = new Expense(new Date().toISOString(), 0, 'Accomodation', '');
  }
  get testing() { return JSON.stringify(this.expense); }
  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid && this.expense.amount > 0) {

      this.expenseProvider.addItem(this.expense);
      alert('Expense submitted:'
        + "\n Date: " + this.expense.date
        + "\n Amount: " + "$" + this.expense.amount
        + "\n Category: " + this.expense.category
        + "\n Merchant: " + this.expense.merchant
        + "\n Notes: " + this.expense.notes);

    }
  }
}
