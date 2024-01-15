

export function joinNs(outerelement,nsList) {
    const nsEndpoint = outerelement.getAttribute('ns')
    const nsElementClicked = nsList.find((element) => element.ns === nsEndpoint)
    const rooms = nsElementClicked.room;
    let roomList = document.querySelector(".room-list")
    roomList.innerHTML = "";

    rooms.forEach(room => roomList.innerHTML += ` <li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`)
}

