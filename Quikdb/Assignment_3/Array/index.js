// INVENTORY CHALLENGE

const inventory = [
  { name: 'Apple', price: 2, quantity: 30 },
  { name: 'Banana', price: 1, quantity: 50 },
  { name: 'Orange', price: 3, quantity: 20 }
];

// Add a new item
inventory.push({ name: 'Mango', price: 4, quantity: 15 });

// Remove an item
const index = inventory.findIndex((item) => item.name === 'Banana');
inventory.splice(index, 1);


//Update quantity
inventory.find((item) => {
  if (item.name === 'Orange') {
    item.quantity = item.quantity - 10;
  }
});

// Find an item
const apple = inventory.find((item) => item.name === 'Apple');
console.log(apple);

// Filter expensive items
const expensiveItems = inventory.filter((item) => {
  return item.price > 2;
});

console.log(expensiveItems);

// Calculate total value
const totalValue = inventory.reduce((total, currItem) => {
  return total + (currItem.price * currItem.quantity);
}, 0)

console.log(`Total Inventory Value: ${totalValue}`);