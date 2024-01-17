import { nameSpaceSockets } from "./Clientscript.js"

export const joinRoom=(roomTitle,namespaceId)=>{
// console.log(nameSpaceSockets)

nameSpaceSockets[namespaceId].emit('joinRoom',roomTitle);

}