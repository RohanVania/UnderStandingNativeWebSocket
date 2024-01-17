import { joinNs } from "./JoinNs.js"

//* Connected to Main Namespace
const socket = io('');

//* Different Sockets we will put in the array

const nameSpaceSockets=[];

socket.on('connect', () => {
    console.log("Client Connected to the Socket", socket.id);
})

socket.emit('clientFirstMessage', "Client Connected")

socket.on('welcome', (data) => {
    console.log(data)
})

socket.on('nsList', (nsList) => {
    console.log(nsList)
    const namespaceList = document.querySelector(".namespaces")
    namespaceList.innerHTML = "";
    nsList.forEach((element, indx) => {
        namespaceList.innerHTML += `<div class="namespace " ns="${element.ns}"><img src="${element.image}"></div>`

        console.log("Hello",nameSpaceSockets)

        nameSpaceSockets[element.id].on('nsChange',(data)=>{
            console.log("NameSpaceChanges")
            console.log(data)
        })
    })

    
    Array.from(document.getElementsByClassName("namespace")).forEach((outerelement, indx) => {
        outerelement.addEventListener('click', (e) => {
            
            localStorage.setItem('nsactive',outerelement.getAttribute('ns'))

            joinNs(outerelement, nsList);

            // const nsEndpoint=outerelement.getAttribute('ns')
            // const nsElementClicked=nsList.find((element)=>element.ns ===nsEndpoint)
            // const rooms=nsElementClicked.room;
            // let roomList=document.querySelector(".room-list")
            // roomList.innerHTML="";

            // rooms.forEach(room=>roomList.innerHTML+=` <li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`)

        })
    })

    let alreadypressed=localStorage.getItem('nsactive');
    if(alreadypressed){
        let {id}=nsList.find((el,indx)=>el.ns===alreadypressed);
        joinNs(document.getElementsByClassName('namespace')[id],nsList);
    }  else{

        joinNs(document.getElementsByClassName("namespace")[0],nsList);
    }


})

