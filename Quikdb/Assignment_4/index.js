class Library {

  name;
  location;
  numberOfBooks;
  categories = ["Fiction", "Non-Fiction", "Science"];
  books = [];

  getAvailableBooks() {
    return this.books
    .filter((book) => book.isAvailable )
    .map((book) => book.title );
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  calculateAverageRating (title) {
    const rating = this.books
    .filter((book) => book.title === title)
    .map((book) => book.rating);
    
    if (rating.length === 0) { return null }

    const totalRating = rating.reduce((total, curr) => total + curr, 0);
    return (totalRating / rating.length);
  } 
  
}

const myLibrary = new Library();

myLibrary.addBook({ 
  title: "The Great Gatsby",
  author: "Scott Fitzgerald",
  isAvailable: true,
  rating: [10, 8, 9, 7]
});

myLibrary.addBook({ 
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  isAvailable: true,
  rating: [8, 9, 10]
});

myLibrary.addBook({ 
  title: "1984",
  author: "George Orwell",
  isAvailable: true,
  rating: [8, 9, 7]
});

// Print the available books
console.log(myLibrary.getAvailableBooks());

// add to categories
myLibrary.categories.push('Sci-fi')
console.log(myLibrary.categories);

//iterate over object
for (let key in myLibrary) {
  if (Array.isArray(myLibrary[key])) {
    console.log(key + ":");
    myLibrary[key].forEach((value) => console.log(value));
   } else if (myLibrary[key] === 'function') {
    console.log(key, myLibrary[key]());
   } else {
    console.log(key, myLibrary[key]);
   }
}

const newLibrary = { ...myLibrary };

console.log(myLibrary === newLibrary);

// Reason why the comparison operator shows false when the above objects are compared is beacause
// the objects are stored in different memory locations
// The comparison operator checks the memory location of both objects and returns false since they aren't the same.