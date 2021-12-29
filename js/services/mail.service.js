import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const bookService = {
  query,
  addCar,
  removeCar,
  getBookById,
  addReview,
};

const KEY = 'mailDB';
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
   }

_createMails();

function query(filterBy = null) {
  const mails = _loadCarsFromStorage();
  if (!filterBy) return Promise.resolve(mails);
  const filteredMails = _getFilteredMails(mails, filterBy);
  return Promise.resolve(filteredMails);
}

function _getFilteredMails(mails, filterBy) {
//   let { name, maxPrice, minPrice } = filterBy;
//   minPrice = minPrice ? minPrice : 0;
//   maxPrice = maxPrice ? maxPrice : Infinity;
//   return mails.filter((book) => {
//     return (
//       book.title.toUpperCase().includes(name.toUpperCase()) &&
//       book.listPrice.amount >= minPrice &&
//       book.listPrice.amount <= maxPrice
//     );
//   });
}

function removeCar(carId) {
  // let cars = _loadCarsFromStorage()
  // cars = cars.filter(car => car.id !== carId)
  // _saveCarsToStorage(cars);
  // return Promise.resolve()
}

function addCar(vendor, speed) {
  // const cars = _loadCarsFromStorage()
  // var car = _createCar(vendor, speed)
  // cars = [car, ...cars]
  // _saveCarsToStorage(cars);
  // return Promise.resolve(car)
}

function getBookById(bookId) {
  const books = _loadCarsFromStorage();
  let book = books.find((book) => bookId === book.id);
  return Promise.resolve(book);
}

function addReview(bookId, review) {
  const books = _loadCarsFromStorage();
  let book = books.find((book) => book.id === bookId);
  console.log(bookId);
  if (!book.reviews) book.reviews = [];
  book.reviews = [review, ...book.reviews];
  _saveCarsToStorage(books);
  return Promise.resolve();
}

function _createMails(vendor, speed) {
    let mails = _loadCarsFromStorage();
    if (!mails || !mails.length) {
      mails = [{
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,  
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,  
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,  
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,  
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,  
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,  
      },
    ]
    }
    _saveCarsToStorage(mails)
}

function _createMail(vendor, speed) {   
  return {
    id: utilService.makeId(),
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    from: 'toto@toto.com',
    to: 'momo@momo.com',
    isDraft: false,  
  }
}

function _saveCarsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _loadCarsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
