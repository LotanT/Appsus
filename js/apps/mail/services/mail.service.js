import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const mailService = {
  query,
  addMail,
  removeCar,
  addReview,
  setMailRead,
};

const KEY = 'mailDB';
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

_createMails();

function query(filterBy = null) {
  const mails = _loadMailsFromStorage();
  if (!filterBy) return Promise.resolve(mails);
  const filteredMails = _getFilteredMails(mails, filterBy);
  return Promise.resolve(filteredMails);
}

function setMailRead(mailId) {
  let mails = _loadMailsFromStorage();
  let mail = mails.find((mail) => mail.id === mailId);
  mail.isRead = true;
  console.log(mail);
  _saveMailsToStorage(mails);
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
  let mails = _loadMailsFromStorage();
  // cars = cars.filter(car => car.id !== carId)
  // _saveCarsToStorage(cars);
  // return Promise.resolve()
}

function addMail(newMail) {
  let mails = _loadMailsFromStorage();
  let mail = {
    id: utilService.makeId(),
    subject: newMail.subject,
    body: newMail.body,
    isRead: newMail.isRead,
    sentAt: newMail.sentAt,
    from: newMail.from ? newMail.from : loggedinUser.email,
    to: 'momo@momo.com',
    isDraft: false,
  };
  mails = [mail, ...mails]
  console.log(mails)
  _saveMailsToStorage(mails);
  return Promise.resolve(mail)
}

function getMailsById(bookId) {
  const books = _loadMailsFromStorage();
  let book = books.find((book) => bookId === book.id);
  return Promise.resolve(book);
}

function addReview(bookId, review) {
  const books = _loadMailsFromStorage();
  let book = books.find((book) => book.id === bookId);
  console.log(bookId);
  if (!book.reviews) book.reviews = [];
  book.reviews = [review, ...book.reviews];
  _saveMailsToStorage(books);
  return Promise.resolve();
}

function _createMails(vendor, speed) {
  let mails = _loadMailsFromStorage();
  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: 'why you didnt',
        body: 'Would love ssdf sadfasdf sdf to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love I thought we are togther sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'lolo@toto.com',
        to: 'momo@momo.com',
        isDraft: false,
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'silvia@toto.com',
        to: 'momo@momo.com',
        isDraft: false,
      },
      {
        id: utilService.makeId(),
        subject: 'where are you',
        body: 'hahah mashu mashu',
        isRead: false,
        sentAt: 1551133930594,
        from: 'lotan@toto.com',
        to: 'momo@momo.com',
        isDraft: false,
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would fgsd sdfgs sdfg sdfdg sdfg sdfg sdfg sdfg sdfg sdfg sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        isDraft: false,
      },
    ];
  }
  _saveMailsToStorage(mails);
}

function _createMail(vendor, speed) {
  return {
    id: utilService.makeId(),
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    from: 'toto@toto.com',
    to: 'momo@momo.com',
    isDraft: false,
  };
}

function _saveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
