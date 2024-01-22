
class RoomClass{
    constructor(roomId,roomTitle,namespaceId,privateRoom=false){
        this.roomId=roomId;
        this.roomTitle=roomTitle;
        this.namespaceId=namespaceId;
        this.privateRoom=privateRoom;
        this.history=[];

    }

    addMessage(message){
        console.log('History Message');
        this.history.push(message)
        console.log(this.history)
    }

    clearHistory(){
        this.history=[];
    }


}

export default RoomClass