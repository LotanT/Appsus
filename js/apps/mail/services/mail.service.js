import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const mailService = {
  query,
  addMail,
  deleteMail,
  addReview,
  setMailRead,
  getMailsById
};

const KEY = 'mailDB';
const loggedinUser = {
  email: 'momo@momo.com',
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
  let { mailType, isRead, search } = filterBy;
  mails = _getFilteredMailType(mails, mailType);
  mails = _getFilteredMailIsRead(mails, isRead);
  return _getFilteredMailSearch(mails, search);
}

function _getFilteredMailSearch(mails, search) {
  if (search === '') return mails;
  mails = mails.filter((mail) =>
    mail.subject.toUpperCase().includes(search.toUpperCase())
  );
  return mails.filter((mail) =>
    mail.body.toUpperCase().includes(search.toUpperCase())
  );
}

function _getFilteredMailIsRead(mails, isRead) {
  if (isRead === '') return mails;
  return mails.filter((mail) => mail.isRead);
}

function _getFilteredMailType(mails, mailType) {
  switch (mailType) {
    case 'inbox':
      return mails.filter((mail) => mail.to === loggedinUser.email);
    case 'starred':
      return mails.filter((mail) => mail.isStarred);
    case 'sent':
      return mails.filter((mail) => mail.from === loggedinUser.email);
    case 'draft':
      return mails.filter((mail) => mail.isDraft);
    case '':
      return mails;
  }
}

function deleteMail(mailId) {
  let mails = _loadMailsFromStorage();
  mails = mails.filter((mail) => mail.id !== mailId);
  _saveMailsToStorage(mails);
  return Promise.resolve(mails);
}

function addMail(newMail) {
  console.log(newMail);
  let mails = _loadMailsFromStorage();
  let mail = {
    id: utilService.makeId(),
    subject: newMail.subject,
    body: newMail.body,
    isRead: newMail.isRead,
    sentAt: newMail.sentAt,
    from: loggedinUser.email,
    to: newMail.to ? newMail.to : loggedinUser.email,
    isDraft: newMail.isDraft,
    isStarred: false,
  };
  mails = [mail, ...mails];
  console.log(mails);
  _saveMailsToStorage(mails);
  return Promise.resolve(mail);
}

function getMailsById(bookId) {
  const books = _loadMailsFromStorage();
  let book = books.find((book) => bookId === book.id);
  return Promise.resolve(book);
}

function addReview(bookId, review) {
  // const books = _loadMailsFromStorage();
  // let book = books.find((book) => book.id === bookId);
  // console.log(bookId);
  // if (!book.reviews) book.reviews = [];
  // book.reviews = [review, ...book.reviews];
  // _saveMailsToStorage(books);
  // return Promise.resolve();
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
        isStarred: false,
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
        isStarred: false,
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
        isStarred: false,
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
        isStarred: false,
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
        isStarred: false,
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
        isStarred: false,
      },
      {
        body: 'asdfasdf',
        from: 'asdfkj@gmali.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: false,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'lotan@gmali.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: false,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'oferk@gmali.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: false,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
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
