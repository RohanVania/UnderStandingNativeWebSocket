
class NamespaceClass{
    constructor(id,image,ns,room){
        this.id=id;
        this.image=image;
        this.ns=ns;
        this.room=[];
    }

    addRoom(roomobj){
        this.room.push(roomobj);
    }
}

export default NamespaceClass;