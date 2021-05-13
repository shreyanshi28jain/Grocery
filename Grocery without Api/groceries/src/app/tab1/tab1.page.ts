import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  title = "Grocery";

  items = [
      {
          name: "Potato",
          quantity: 12
      },
      {
          name: "Mango",
          quantity: 200
      },
      {
          name: "Tomato",
          quantity: 30
      },
      {
          name: "Onion",
          quantity: 21
      },
      {
        name: "Orange",
        quantity: 15 
      }

  ];
  constructor(public inputDialogService: InputDialogServiceService,public dataService:GroceriesServiceService , public socialSharing: SocialSharing,public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }
  loadItems() {
    return this.dataService.getItems();
  }
  
  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
        message: "Removing Item - " + item.name + " ..." ,
        duration: 3000
    });
    (await toast).present();

    this.dataService.removeItem(index);

  }

  addItem() {
    console.log('meow');
    this.inputDialogService.showPrompt();
  }




  async editItem(item, index) {
  console.log("Editinging Item - ", item, index);
  const toast = this.toastCtrl.create({
      message: "Editing Item - " + item.name + " ..." ,
      duration: 3000
  });
  (await toast).present();
  this.inputDialogService.showPrompt(item, index);

}

 

  async shareItem(item, index) {
  console.log("Sharing Item - ", item, index);
  const toast = this.toastCtrl.create({
      message: "Sharing Item - " + item.name + " ..." ,
      duration: 3000
  });
  
  (await toast).present();

  let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
  let subject = "Shared via Groceries app";
  // Check if sharing via email is supported
  this.socialSharing.share(message, subject).then(() => {
    // Sharing via email is possible
    console.log("Shared success");
  }).catch((error) => {
    // Sharing via email is not possible
    console.error("Error while sharing ", error);
  });


}
}