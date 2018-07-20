import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfilePage } from '../profile/profile';
import { User } from '../../models/User';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user: User;
  

  signupError: string;


  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.user = new User('','');
    console.log(this.user);
  }
  signup() {

    this.authService.signup(this.user.email, this.user.password)

      .then(

      () => {

        this.authService.updateProfile(this.user.name, '').then(

          () => this.navCtrl.setRoot(LoginPage),

          error => this.signupError = error.message

        );
        alert("Registration successful");

      },

      error => this.signupError = error.message

      );

  }
}
