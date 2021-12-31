import { utilService } from "../../../services/util.service.js";

export const notesIndex = {
    getNotes
}

function getNotes() {
    return notes;
}
const notes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "GoReact"
        },
        style: {
            backgroundColor: "#98DDCA"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: true,
        info: {
            url: 'imgs/app/keep/orange.jpg',
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#FFD3B4"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        isPinned: false,
        info: {
            title: "My Todo",
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null, id: utilService.makeId() },
                { txt: "Coding power", doneAt: 187111111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#FFAAA7"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: true,
        info: {
            url: 'https://scontent.ftlv1-1.fna.fbcdn.net/v/t39.30808-6/218622006_10159487683897220_1890866282917785933_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=PXkqUQZnqTkAX-VUGHY&_nc_ht=scontent.ftlv1-1.fna&oh=00_AT9j24gCrf5vaIa4tLdVDLXxTz8XXAEv-DESK1NvlUE_ug&oe=61D3CA90',
            title: "BootCamp Group Picture!"
        },
        style: {
            backgroundColor: "#FFD3B4"
        }
    },{
    id: utilService.makeId(),
    type: "note-txt",
    isPinned: true,
    info: {
        txt: "Toda raba",
        title: "Shabat Shalom!"
    },
    style: {
        backgroundColor: "#98DDCA"
    }
},    {
    id: utilService.makeId(),
    type: "note-todos",
    isPinned: false,
    info: {
        title: "Remember Todos!",
        label: "Get my stuff together",
        todos: [
            { txt: "CTRL+S", doneAt: null, id: utilService.makeId() },
            { txt: "key in Map", doneAt: 187111111, id: utilService.makeId() },
            { txt: "Eat sometimes", doneAt: 187111111, id: utilService.makeId() }

        ]
    },
    style: {
        backgroundColor: "#FFAAA7"
    }
},

];