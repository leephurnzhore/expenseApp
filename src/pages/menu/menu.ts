import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartService } from '../../providers/cart.service';
import { Cart } from '../../models/cart';
import {AuthService} from '../../providers/auth-service';
import {CartPage} from '../cart/cart';
import {BeerChickenPage} from '../beerchicken/beerchicken';
import {SteakEggsPage} from '../steak-eggs/steak-eggs';
import {LobsterMacPage} from '../lobster-mac/lobster-mac';
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'

})
export class MenuPage {
menuSelected: String;
  constructor(public navCtrl: NavController, public cartService: CartService) {
  }
  goCartPage(){
    this.navCtrl.setRoot(CartPage);
  }

  goLobsterMacPage(){
this.navCtrl.setRoot(LobsterMacPage);    
  }
  goSteakEggsPage(){
    this.navCtrl.setRoot(SteakEggsPage);
  }
  goBeerChickenPage(){
this.navCtrl.setRoot(BeerChickenPage);    
  }

  addToCart(item)  : void  {
    this.cartService.addCartItem(item);
  }

  openCart() : void {
    this.navCtrl.push(CartPage);
  }

  
}
