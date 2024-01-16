import { joinNs } from "./JoinNs.js"
const socket = io('');
// prompt("What is your Name");
// prompt("Password");

socket.on('connect', () => {
    console.log("Client Connected to the Socket", socket.id);
})

socket.emit('clientFirstMessage', "Client Connected")

socket.on('welcome', (data) => {
    console.log(data)
})

socket.on('nsList', (nsList) => {
    const namespaceList = document.querySelector(".namespaces")
    namespaceList.innerHTML = "";
    nsList.forEach((element, indx) => {
        namespaceList.innerHTML += `<div class="namespace " ns="${element.ns}"><img src="${element.image}"></div>`
    })

    
    Array.from(document.getElementsByClassName("namespace")).forEach((outerelement, indx) => {
        outerelement.addEventListener('click', (e) => {
            
            console.log(outerelement)
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

