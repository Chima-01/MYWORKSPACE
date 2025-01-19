const inventory = [
  { name: 'Apple', price: 2, quantity: 30 },
  { name: 'Banana', price: 1, quantity: 50 },
  { name: 'Orange', price: 3, quantity: 20 },
  { name: 'Mango', price: 4, quantity: 15 }
];

// Double the price of all items

for (let i = 0; i < inventory.length; i++) {
  inventory[i].price = inventory[i].price * 2;
}

// Reduce quantity of each item by 5
let i = 0;

while (i < inventory.length) {
  inventory[i].quantity = inventory[i].quantity - 5;
  i++;
}

// Find items under a specific price
priceLessThan5 = [];

for (let item of inventory) {
  if (item.price < 5) {
    priceLessThan5.push(item);
  }
}

// Count total items in inventory
let totalQuantity = 0;

for (let items of inventory) {
  for (let item in items) {
    if (item === 'quantity') {
      totalQuantity += items[item];
    }
  }
}

// Recreate inventory
const newInventory = [];
for (let i = 0; i < inventory.length; i++) {
  newInventory.push({ name: inventory[i].name + ' (New)', price: (inventory[i].price * 1.1).toFixed(1), quantity: inventory[i].quantity });
}

console.log(inventory, priceLessThan5, totalQuantity, newInventory);