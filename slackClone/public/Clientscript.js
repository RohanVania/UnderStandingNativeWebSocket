
import { joinNs } from "./JoinNs.js"
import { buildMessage } from "./buildMessage.js";

const username=prompt('Enter your name to start chatting')

//* Connected to Main Namespace
const socket = io('');

//* Different Sockets we will put in the array

export const nameSpaceSockets = [];

const listerners = {
    nschange: [],
    messageToRoon: [],
}

export let selectedNs = {
    selectedNs: 1
}

//* add a submit handler for our form
document.querySelector('#message-form').addEventListener('submit', (eventHandler) => {
    eventHandler.preventDefault();
    //* Grab the value from the input box
    const newMessage = document.querySelector('#user-message').value;
    nameSpaceSockets[selectedNs.selectedNs].emit('newMessageToRoom', {
        newMessage: newMessage,
        date: Date.now(),
        avatar: 'https://via.placeholder.com/30',
        username: username,
        selectedNs
    })

    document.querySelector('#user-message').value = "";

})

//* Add Listeners job is to manage all listeners added to all namespaces.
//* this prevents listerners being added multiples times and makes 

const addListeners = (id) => {
    if (!listerners.nschange[id]) {
        nameSpaceSockets[id].on('nsChange', (data) => {
            console.log("NameSpace Changed");
            console.log(data)
        })

        listerners.nschange[id] = true;
    }
    if (!listerners.messageToRoon[id]) {
        nameSpaceSockets[id].on('messageToRoom', messageObj => {
            console.log(messageObj);
            document.querySelector('#messages').innerHTML += buildMessage(messageObj);
            console.log(document.querySelector('#messages'));

        })
        listerners.messageToRoon[id] = true;
    }
}

socket.on('connect', () => {
    // console.log("Client Connected to the Socket", socket.id);
})

socket.emit('clientFirstMessage', "Client Connected")

socket.on('welcome', (data) => {
    // console.log(data)
})

socket.on('nsList', (nsList) => {
    console.log(nsList)
    const namespaceList = document.querySelector(".namespaces")
    namespaceList.innerHTML = "";
    nsList.forEach((element, indx) => {
        namespaceList.innerHTML += `<div class="namespace " ns="${element.ns}"><img src="${element.image}"></div>`

        if (!nameSpaceSockets[element.id]) {
            const thisNs = io(`http://localhost:8004${element.ns}`)
            nameSpaceSockets[element.id] = thisNs;
        }

        addListeners(element.id)

        // console.log("Hello",nameSpaceSockets)
        // nameSpaceSockets[element.id].on('nsChange',(data)=>{
        //     console.log("NameSpaceChanges")
        //     console.log(data)
        // })
    })


    Array.from(document.getElementsByClassName("namespace")).forEach((outerelement, indx) => {
        outerelement.addEventListener('click', (e) => {

            localStorage.setItem('nsactive', outerelement.getAttribute('ns'))

            joinNs(outerelement, nsList, selectedNs);

            // const nsEndpoint=outerelement.getAttribute('ns')
            // const nsElementClicked=nsList.find((element)=>element.ns ===nsEndpoint)
            // const rooms=nsElementClicked.room;
            // let roomList=document.querySelector(".room-list")
            // roomList.innerHTML="";

            // rooms.forEach(room=>roomList.innerHTML+=` <li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`)

        })
    })

    let alreadypressed = localStorage.getItem('nsactive');

    if (alreadypressed) {
        let { id } = nsList.find((el, indx) => el.ns === alreadypressed);
        joinNs(document.getElementsByClassName('namespace')[id], nsList, selectedNs);
    } else {
        joinNs(document.getElementsByClassName("namespace")[0], nsList, selectedNs);
    }


})

