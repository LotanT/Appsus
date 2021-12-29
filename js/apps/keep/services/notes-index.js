import { utilService } from "../../../services/util.service.js";

export const notesIndex = {
    getNotes
}

function getNotes() {
    return notes;
}
const notes = [
    {
     id: "n101",
     type: "note-txt",
     isPinned: true,
     info: {
     txt: "Fullstack Me Baby!"
     }
    },
    {
     id: "n102",
     type: "note-img",
     info: {
     url: 'imgs/app/keep/orange.jpg',
     title: "Bobi and Me"
     },
     style: {
     backgroundColor: "#00d"
     }
    },
    {
     id: "n103",
     type: "note-todos",
     info: {
     label: "Get my stuff together",
     todos: [
     { txt: "Driving liscence", doneAt: null ,id: utilService.makeId()},
     { txt: "Coding power", doneAt: 187111111, id: utilService.makeId() }
     ]
     }
    }
    ];