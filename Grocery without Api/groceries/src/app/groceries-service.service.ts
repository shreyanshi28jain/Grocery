import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {
  
  constructor() { }

  
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
  getItems() {
    return this.items;
  }

  async removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(item) {
    this.items.push(item);
  }

  async editItem(item, index) {
    this.items[index] = item;
  }
}
