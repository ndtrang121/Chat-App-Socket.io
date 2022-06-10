const socket = io()

socket.on('message', (message) => {
    console.log(message)
})



document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault() // to prevent browser goes through a full page refresh
    // const message = document.querySelector('input').value
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (msg) => {
        console.log('The message was delivered!', msg)
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const coordinator = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', coordinator)

    })
})