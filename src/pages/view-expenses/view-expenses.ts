import { Component, OnInit  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense } from '../../models/expense';
import { ExpenseFbProvider } from '../../providers/expense-firebase';

@Component({
  selector: 'page-view-expenses',
  templateUrl: 'view-expenses.html'
})
export class ViewExpensesPage implements OnInit {
  expenses: Expense[];

  getItems(ev: any) {

    let val = ev.target.value;

    console.log("search " + val);



    this.expenses = this.expenseService.searchItems(val)

  }


  constructor(public navCtrl: NavController, private expenseService: ExpenseFbProvider) {
  }
  
  ngOnInit() {

    if (status = "pending") {
      this.expenseService.getItems()

        .subscribe(expenses => {

          for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].favIcon == "") {
              expenses[i].favIcon = "heart-outline";
            }


          }
          this.expenses = expenses;

          console.log("Done", expenses);
        }

        );
    }
    else {

     

    }
  }
  

    
  
  toggleFav(item: Expense) {
    if (item.favIcon == "heart-outline")
      item.favIcon = "heart";
    else
      item.favIcon = "heart-outline";
  }

  deleteItem(item: Expense) {
    this.expenseService.removeItem(item);
  }
}
