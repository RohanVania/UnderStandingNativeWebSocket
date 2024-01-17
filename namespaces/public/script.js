const socket = io( );

socket.on('connect', () => {
    console.log("Client Connected to Server")
    // console.log(socket)
})


const input=document.getElementById('input-div');
const form=document.getElementById('form-submit');
const list=document.getElementById('messages');


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    socket.emit('messagetoClientonFormSubmit',{text:input.value});
    input.value="";

})

socket.on('emittingtoallClients',(data)=>{
    list.innerHTML+=`<li>${data.text}</li>`
})