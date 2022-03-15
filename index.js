// the store function accepts an optional array as initialData,
// persist the data using the localStorage API
// and returns the three methods below:
// 1. all() - returns an array of all objects in the store
// 2. add(newDAta) - accepts an object and stores it to the store persitted by the localstorage API
// 3. remove(id) - accepts an id and filter the existing store with the id.
//  returns and persists the remaning data

const store = (initialData = []) => {
  let books;

  const saveToLocalStorage = (data) => {
    const booksString = JSON.stringify(data);
    localStorage.setItem('bookStoreData', booksString);
    return true;
  };

  const rawBooksData = localStorage.getItem('bookStoreData');
  if (rawBooksData) {
    books = JSON.parse(rawBooksData);
  } else {
    books = initialData;
    saveToLocalStorage(books);
  }

  const all = () => books;

  const add = (newData) => {
    if (!newData || !newData.id) {
      return false;
    }
    books.push(newData);
    return saveToLocalStorage(books);
  };

  const remove = (id) => {
    books = books.filter((book) => book.id !== id);
    return saveToLocalStorage(books);
  };

  return {
    all,
    add,
    remove,
  };
};

// Display book function:
// 1. accepts an object with {id, author, title}
// 2. creates a li element and populates the objects with it
// 3. query the ul element and appends the li to it
const displayBook = ({ title, author, id }, parentElement) => {
  const bookListItemElement = document.createElement('li');
  bookListItemElement.className = 'book-list-item';
  bookListItemElement.innerHTML = `
      <section>
        <h3>${title}</h3>
        <p>${author}</p>
        <button id="${id}" type="button">Remove</button>
        </section>`;
  parentElement.appendChild(bookListItemElement);
};

const initialBooks = [
  {
    title: 'the boy with wings',
    author: 'Basit Korede',
    id: 'first',
  },

  {
    title: 'the boy with wings',
    author: 'Basit Korede',
    id: 'second',
  },
];

const bookStore = store(initialBooks);
const books = bookStore.all();
books.forEach((book) => {
  const bookListElement = document.querySelector('ul.book-list');
  displayBook(book, bookListElement);
});
