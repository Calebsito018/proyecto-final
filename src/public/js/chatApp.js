const socketClient = io();
const welcomeUser = document.getElementById('welcomeUser');
const nameChat = document.getElementById('nickName');
const nickname = nameChat.textContent

swal.fire({
    title: `Bienvenido ${nickname}`,
    confirmButtonColor: "#254053",
    timer: 3000,
})
socketClient.emit('newUser',nickname)

welcomeUser.innerText = `Conectado como: ${nickname}`
welcomeUser.classList.add('nickname-green');
// Envío de usuario y mensaje que entran por el form
const messageForm = document.getElementById("messageForm");
messageForm.onsubmit = (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    socketClient.emit('chatMessage', { user: nickname, message });
    document.getElementById('message').value = '';
};

// Renderizo los mensajes a los usuarios conectados
socketClient.on('returnMessage', (messageData) => {
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<span>${messageData.user}</span>: ${messageData.message}`;
    messages.appendChild(newMessage);
});

// Recibo nombre de usuario y devuelvo notificacion a los usuarios
socketClient.on('userConnected', user => {
    Toastify({
        text: `${user} se ha unido al chat`,
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
});