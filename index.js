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

store();