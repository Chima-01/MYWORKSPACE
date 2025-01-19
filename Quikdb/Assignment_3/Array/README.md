## Intermediate Array Challenge
**Objective**: Solve a real-world problem by applying your understanding of arrays, including their methods and properties, in a hands-on coding task.

**Challenge**: Inventory Management

You are managing the inventory for a small store. The store tracks items in an array, with each item being represented as an object containing a name, price, and quantity. Your task is to write a series of operations to manage the inventory using array methods.

Here is your starting inventory:

```
const inventory = [
  { name: 'Apple', price: 2, quantity: 30 },
  { name: 'Banana', price: 1, quantity: 50 },
  { name: 'Orange', price: 3, quantity: 20 }
];
```

Steps:

**Add a new item**: Add a new object representing a Mango with a price of 4 and a quantity of 15 to the inventory.

**Remove an item**: A shipment of Bananas was canceled. Remove the Banana item from the inventory.

**Update quantity**: Sell 10 Oranges and update its quantity in the inventory.

**Find an item**: Check if Apple is still in stock and print its details.

**Filter expensive items**: Create a new array of items with a price greater than 2.

**Calculate total value**: Calculate and print the total value of the inventory. The total value of an item is price * quantity.