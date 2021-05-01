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
  
  title = "Grocery"
  
  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
    this.loadItems();
  }
  
  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error
        );
  }

   // Add Item
  addItem() {
    console.log('Adding Item...');
    this.inputDialogService.showAlert();
  } 

  // Edit Item
  async editItem(item, index) {
     
    console.log('Edit Item: ', item, index);
    const toast = this.toastCtrl.create({
      message: 'Updating Item: ' + item.name,
      duration: 3000
    });
    (await toast).present();
    this.inputDialogService.showAlert( item, index ,item._id);
  }

  // Remove Item
 async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
      });
    (await toast).present(); 
     
    this.dataService.removeItem(item._id,item);
 }

 // Share Item
 async shareItem(item, index){
  console.log("Sharing Item -", item, index);
  const toast = await this.toastCtrl.create({
    message: 'Sharing Item - ' + index + " ...",
    duration: 3000
  });
  toast.present();
  
  let message = "Grocery Item - Name : " + item.name + " - Quantity: " + item.quantity;
  let subject = "Shared via Groceries app";

  this.socialSharing.share(message, subject).then(() => {
    // Sharing via email is possible
    console.log("Shared successfully!")
  }).catch((error) => {
    // Sharing via email is not possible
    console.error("Error while sharing ", error)
  });
}
}