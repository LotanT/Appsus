import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const mailService = {
  query,
  sentMail,
  deleteMail,
  toggleReadUnread,
  setMailRead,
  getMailsById,
  toggleStsrred,
};

const KEY = 'mailDB';
const loggedinUser = {
  email: 'momo@momo.com',
  fullname: 'Mahatma Appsus',
};

_createMails();

function query(filterBy = null, sortBy) {
  const mails = _loadMailsFromStorage();
  if (!filterBy) return Promise.resolve(mails);
  let filteredMails = _getFilteredMails(mails, filterBy);
  filteredMails = _getSortedMails(filteredMails,sortBy)
  return Promise.resolve({filteredMails,mails});
}

function setMailRead(mailId) {
  let mails = _loadMailsFromStorage();
  let mail = mails.find((mail) => mail.id === mailId);
  mail.isRead = true;
  _saveMailsToStorage(mails);
}

function _getSortedMails(mails,sortBy){
  if(sortBy === '') return mails;
  if(sortBy === 'date'){
   return mails.sort((mailA,mailB)=> mailB.sentAt - mailA.sentAt)
  }
  // if(sortBy === 'subject') mails.sort((mailA,mailB)=>{
  //   let a = mailA.subject, b = mailB.subject; 
  //   console.log(a,b)
  //   if(b.toUpperCase() > a.toUpperCase()) return -1;
  //   if(b.toUpperCase() < a.toUpperCase()) return 1;
  //   return 0;
  // })
  return  mails.sort((mailA,mailB)=>{
    if(mailB.from.toUpperCase() > mailA.from.toUpperCase()) return -1;
    if(mailB.from.toUpperCase() < mailA.from.toUpperCase()) return 1;
    return 0;
  })
}

function _getFilteredMails(mails, filterBy) {
  let { mailType, isRead, search } = filterBy;
  mails = _getFilteredMailType(mails, mailType);
  mails = _getFilteredMailIsRead(mails, isRead);
  return _getFilteredMailSearch(mails, search);
}

function _getFilteredMailSearch(mails, search) {
  if (search === '') return mails;
  return mails.filter((mail) => {
    return mail.subject.toUpperCase().includes(search.toUpperCase()) ||
    mail.from.toUpperCase().includes(search.toUpperCase()) ||
    mail.to.toUpperCase().includes(search.toUpperCase()) ||
    mail.body.toUpperCase().includes(search.toUpperCase())
  });
}

function _getFilteredMailIsRead(mails, isRead) {
  if (isRead === '') return mails;
  if (isRead === 'read') return mails.filter((mail) => mail.isRead);
  else return mails.filter((mail) => !mail.isRead);
}

function _getFilteredMailType(mails, mailType) {
  switch (mailType) {
    case 'inbox':
      return mails.filter((mail) =>{
        return mail.to === loggedinUser.email &&
        !mail.isDraft
      });
    case 'starred':
      return mails.filter((mail) => mail.isStarred);
    case 'sent':
      return mails.filter((mail) =>{
        return mail.from === loggedinUser.email &&
        !mail.isDraft
      });
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

function sentMail(newMail) {
  let mails = _loadMailsFromStorage();
  let mail = {
    id: utilService.makeId(),
    subject: newMail.subject,
    body: newMail.body,
    isRead: newMail.isRead,
    sentAt: newMail.sentAt,
    from: loggedinUser.email,
    to: newMail.to ? newMail.to : loggedinUser.email,
    cc: newMail.cc,
    bcc: newMail.bcc,
    isDraft: newMail.isDraft,
    isStarred: false,
  };
  mails = [mail, ...mails];
  _saveMailsToStorage(mails);
  return Promise.resolve(mail);
}

function getMailsById(mailId) {
  const mails = _loadMailsFromStorage();
  let mail = mails.find((mail) => mailId === mail.id);
  return Promise.resolve(mail);
}

function toggleReadUnread (mailId) {
  const mails = _loadMailsFromStorage()
  let mail = mails.find((mail) => mailId === mail.id);
  mail.isRead = !mail.isRead;
  _saveMailsToStorage(mails)
}

function toggleStsrred(mailId){
  const mails = _loadMailsFromStorage()
  let mail = mails.find((mail) => mailId === mail.id);
  mail.isStarred = !mail.isStarred;
  _saveMailsToStorage(mails)
}

function _createMails(vendor, speed) {
  let mails = _loadMailsFromStorage();
  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: 'why you didnt',
        body: 'Would love ssdf sadfasdf sdf to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
        isDraft: false,
        isStarred: false,
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'ofek@gmali.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: true,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love I thought we are togther sometimes',
        isRead: true,
        sentAt: 1551133930594,
        from: 'lolo@toto.com',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
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
        cc: '',
        bcc: '',
        isDraft: false,
        isStarred: true,
      },
      {
        id: utilService.makeId(),
        subject: 'where are you',
        body: 'hahah mashu mashu',
        isRead: false,
        sentAt: 1551133930594,
        from: 'lotan@toto.com',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
        isDraft: false,
        isStarred: false,
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'bobo@toto.com',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
        isDraft: false,
        isStarred: true,
      },
      {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would fgsd sdfgs sdfg sdfdg sdfg sdfg sdfg sdfg sdfg sdfg sometimes',
        isRead: true,
        sentAt: 1551133930594,
        from: 'toto@toto.com',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
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
        cc: '',
        bcc: '',
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
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'jojo@gmali.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: true,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'roro@gmali.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: true,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'dodo@gmali.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: false,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
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
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'momo@momo.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: false,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'momo@momo.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: false,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'momo@momo.com',
        id: utilService.makeId(),
        isDraft: false,
        isRead: false,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'ofek@gmali.com',
        id: utilService.makeId(),
        isDraft: true,
        isRead: true,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'koko@gmali.com',
        id: utilService.makeId(),
        isDraft: true,
        isRead: true,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
      },
      {
        body: 'asdfasdf did didi  sadfklaw sadfalk sdkfalsk jweroidvnwvwp wnpowunvo wieinv spj aij wnihvhw0iw  wd0iifh 0w0dihdf ',
        from: 'lolo@gmali.com',
        id: utilService.makeId(),
        isDraft: true,
        isRead: true,
        isStarred: false,
        sentAt: 1640866207648,
        subject: 'asdf',
        to: 'momo@momo.com',
        cc: '',
        bcc: '',
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
