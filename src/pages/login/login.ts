import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth-service';
import { ViewExpensesPage } from '../view-expenses/view-expenses';
import { User } from '../../models/User';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: User;

  loginError: string;

  constructor(public navCtrl: NavController, private authService: AuthService) {


    this.user = new User('', '', '');
  }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  login() {

    this.authService.login(this.user.email, this.user.password)

      .then(

      () => this.navCtrl.setRoot(ViewExpensesPage),

      error => this.loginError = error.message

      );

  }
  // this.googleplus.login({

  //  'webClientId': '656802514512-mf33p5e53a43fcf5gnq93rs0qrklhh81.apps.googleusercontent.com'
  //      'offline': true
  //}).then(res => {
  //  firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc => {
  //    alert("LOGIN SUCCESSFULL")

  //  }).catch(ns => {
  //    alert(message ?: any): void
  //      alert("not succ")
  //  })



}
