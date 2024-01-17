import {joinRoom} from "./JoinRoom.js"

//* We Could ask the sever for fresh info . BAD

//*  We have socket.io , and server will tell us when something happens

export function joinNs(outerelement, nsList) {
    const nsEndpoint = outerelement.getAttribute('ns')
    const nsElementClicked = nsList.find((element) => element.ns === nsEndpoint)
    const rooms = nsElementClicked.room;
    let roomList = document.querySelector(".room-list")
    roomList.innerHTML = "";


    rooms.forEach(room =>
        roomList.innerHTML += ` <li class='room' nsid=${room.namespaceId}><span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe'}"></span>${room.roomTitle}</li>`)

    Array.from(document.querySelectorAll('.room')).forEach((roomelement,indx)=>{
        roomelement.addEventListener('click',(e)=>{
           let namespaceIdFromRoom=e.target.getAttribute('nsid')
           joinRoom(e.target.innerText,namespaceIdFromRoom)
        })
    })
}

