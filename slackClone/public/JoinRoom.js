import { nameSpaceSockets } from "./Clientscript.js"
import { buildMessage } from "./buildMessage.js";

export const joinRoom = async (roomTitle, namespaceId) => {
    // console.log(nameSpaceSockets)
    // console.log(roomTitle, ' and ', namespaceId);

    //** One Way to do with Callback */
    // nameSpaceSockets[namespaceId].emit('joinRoom', roomTitle,(response)=>{
    //     console.log('ack received');
    //     console.log(response)

    //     document.querySelector('.curr-room-text').innerHTML=roomTitle;

    //     document.querySelector('.curr-room-num-users').innerHTML=`<span class="curr-room-num-users">Users </span>${response.numberofClientsConnectedtoThisRoom
    //     }</span>`
    // });

    //** Just a more cleaner version of the above code  */
    const ackData= await nameSpaceSockets[namespaceId].emitWithAck('joinRoom', {roomTitle,namespaceId})
        // console.log('ack received');
        // console.log(ackData)

        document.querySelector('.curr-room-text').innerHTML=roomTitle;

        document.querySelector('.curr-room-num-users').innerHTML=`<span class="curr-room-num-users">Users </span>${ackData.numberofClientsConnectedtoThisRoom
        }</span>`
        
        document.querySelector('#messages').innerHTML="";
        ackData.thisRoomHistory.forEach(message=>{
            document.querySelector('#messages').innerHTML+=buildMessage(message);
            console.log(message);
        })

        


    

}