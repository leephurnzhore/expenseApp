import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SubmitExpensePage } from '../pages/submit-expense/submit-expense';
import { ViewExpensesPage } from '../pages/view-expenses/view-expenses';
import { ExpenseDetailsPage } from '../pages/expense-details/expense-details';
import { ApproveExpensePage } from '../pages/approve-expense/approve-expense';
import { CartPage } from '../pages/cart/cart';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExpenseFbProvider } from '../providers/expense-firebase';

import { AuthService } from '../providers/auth-service';
import { MenuPage } from '../pages/menu/menu';
import { SteakEggsPage } from '../pages/steak-eggs/steak-eggs';
import { LobsterMacPage } from '../pages/lobster-mac/lobster-mac';
import { BeerChickenPage } from '../pages/beerchicken/beerchicken';
import { CartService } from '../providers/cart.service';
import { PaymentPage } from '../pages/payment/payment';
import { paymentservice } from '../providers/paymentservice';


// import { GooglePlus } from '@ionic-native/google-plus';
export const firebaseConfig = {
  apiKey: "AIzaSyDiHqvaW35ClJLGvd5WbaLl015UPrc5V2g",
  authDomain: "vereasy-97857.firebaseapp.com",
  databaseURL: "https://vereasy-97857.firebaseio.com",
  projectId: "vereasy-97857",
  storageBucket: "vereasy-97857.appspot.com",
  messagingSenderId: "656802514512"
    }

@NgModule({
  declarations: [
    MyApp,
    SubmitExpensePage,
    ViewExpensesPage,
    ExpenseDetailsPage,
    ApproveExpensePage,
    SignupPage,
    LoginPage,
    ProfilePage,
    MenuPage,
    SteakEggsPage,
    LobsterMacPage,
    BeerChickenPage,
    CartPage,
    PaymentPage
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SubmitExpensePage,
    ViewExpensesPage,
    ExpenseDetailsPage,
    ApproveExpensePage,
    SignupPage,
    LoginPage,
    ProfilePage,
    MenuPage,
    SteakEggsPage,
    LobsterMacPage,
    BeerChickenPage,
    CartPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ExpenseFbProvider,
    AuthService,
    CartService,
     paymentservice,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
